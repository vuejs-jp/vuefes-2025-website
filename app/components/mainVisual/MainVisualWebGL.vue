<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from "vue";
import * as THREE from "three";
import noise2 from "@/assets/images/noise/2.png";

const { animation = true } = defineProps<{
  animation?: boolean;
}>();

const canvasRef = ref<HTMLCanvasElement | null>(null);
const resizeObserver = ref<ResizeObserver | null>(null);

const vertexShader = `
  varying vec2 vUv;
  varying vec3 vNormal;
  varying vec3 vPosition;

  void main() {
    vUv = uv;
    vNormal = normalize(normalMatrix * normal);
    vPosition = position;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

const fragmentShader = `
  uniform float uTime;
  uniform int uIsSphere;
  uniform int uActiveColorSet;
  uniform sampler2D uNoiseTexture;
  uniform struct ColorSet {
    vec3 color1;
    vec3 color2;
    vec3 color3;
  } uColorSet1, uColorSet2, uColorSet3, uColorSet4;

  varying vec2 vUv;
  varying vec3 vNormal;
  varying vec3 vPosition;

  float blendSoftLight(float base, float blend) {
      return (blend<0.5)?(2.0*base*blend+base*base*(1.0-2.0*blend)):(sqrt(base)*(2.0*blend-1.0)+2.0*base*(1.0-blend));
  }
  vec3 blendSoftLight(vec3 base, vec3 blend) {
      return vec3(blendSoftLight(base.r,blend.r),blendSoftLight(base.g,blend.g),blendSoftLight(base.b,blend.b));
  }
  vec3 blendSoftLight(vec3 base, vec3 blend, float opacity) {
      return (blendSoftLight(base, blend) * opacity + base * (1.0 - opacity));
  }
  float map(float value, float inputMin, float inputMax, float outputMin, float outputMax) {
    return clamp(((value - inputMin) / (inputMax - inputMin) * (outputMax - outputMin) + outputMin), outputMin, outputMax);
  }
  vec3 linearToGamma(vec3 color, float gamma) { return pow(color, vec3(1.0 / gamma)); }
  float random(vec2 st) { return fract(sin(dot(st.xy, vec2(12.9898, 78.233))) * 43758.5453123); }
  float noise(vec2 st) {
    vec2 i = floor(st);
    vec2 f = fract(st);
    vec2 u = f * f * (3.0 - 2.0 * f);
    return mix(
      mix(random(i), random(i + vec2(1.0, 0.0)), u.x),
      mix(random(i + vec2(0.0, 1.0)), random(i + vec2(1.0, 1.0)), u.x),
      u.y
    );
  }
  float fbm(vec2 st, float amplitude, float frequency, float lacunarity, float gain, int octaves) {
    float value = 0.0;
    float amp = amplitude;
    float freq = frequency;
    for (int i = 0; i < octaves; i++) {
      value += amp * noise(st * freq);
      freq *= lacunarity;
      amp *= gain;
    }
    return value;
  }
  vec2 flowField(vec2 p, float time) {
    return vec2(
      fbm(p + vec2(0.0, time * 0.1), 0.6, 2.0, 1.8, 0.5, 6),
      fbm(p + vec2(time * 0.1, 0.0), 0.6, 2.0, 1.8, 0.5, 6)
    );
  }
  float generateSumiPattern(vec2 uv, float time, float scale) {
    float timeScale = time * 0.15;
    vec2 st = uv * scale;
    vec2 flow = flowField(st * 2.0, timeScale);
    vec2 flow2 = flowField(st * 4.0 + flow * 0.2, timeScale * 1.2);
    vec2 flow3 = flowField(st * 8.0 + flow2 * 0.15, timeScale * 0.9);
    vec2 finalFlow = flow * 0.5 + flow2 * 0.3 + flow3 * 0.2;
    float marbleNoise = fbm(st + finalFlow * 0.8, 0.6, 2.0, 1.8, 0.5, 6);
    float sumiPattern = fbm((st + finalFlow) * 3.0 + time * 0.05, 0.6, 2.0, 1.8, 0.5, 6);
    return marbleNoise * 0.5 + sumiPattern * 0.5;
  }
  float generateSumiDetail(vec2 uv, float time) {
    vec2 st = uv;
    float timeScale = time * 0.15;
    vec2 flow = flowField(st * 2.0, timeScale);
    vec2 flow2 = flowField(st * 4.0 + flow * 0.2, timeScale * 1.2);
    vec2 flow3 = flowField(st * 8.0 + flow2 * 0.15, timeScale * 0.9);
    vec2 finalFlow = flow * 0.5 + flow2 * 0.3 + flow3 * 0.2;
    return fbm((st + finalFlow) * 6.0 + time * 0.02, 0.8, 4.0, 2.2, 0.7, 4);
  }

  // カラーセットの取得
  ColorSet getActiveColorSet(int setIndex) {
    if (setIndex == 0) return uColorSet1;
    else if (setIndex == 1) return uColorSet2;
    else if (setIndex == 2) return uColorSet3;
    return uColorSet4;
  }
  vec3 calculateColor(float noiseValue, ColorSet colors, vec2 noiseUV, vec2 warpedUV, float time) {
    noiseValue = fract(noiseValue * 5.0);
    vec3 finalColor;
    const float DIVISIONS = 3.0;
    if (noiseValue > 0.3 && noiseValue < 0.33) {
      finalColor = vec3(0.0);
      float sumiDetail = generateSumiDetail((noiseUV+warpedUV)*.1, time*0.1);
      noiseValue = noiseValue*0.95 + sumiDetail*0.05;
      float segment = floor(noiseValue * float(DIVISIONS * 8.0));
      int index = int(mod(segment, 3.0));
      float localPos = fract(noiseValue * float(DIVISIONS * 3.0));
      if (localPos > 0.8) {
        float t = (localPos - 0.8) / 0.2;
        vec3 currentColor = index == 0 ? colors.color1 : (index == 1 ? colors.color2 : colors.color3);
        vec3 nextColor = index == 0 ? colors.color2 : (index == 1 ? colors.color3 : colors.color1);
        finalColor = mix(currentColor, nextColor, t);
      } else {
        finalColor = index == 0 ? colors.color1 : (index == 1 ? colors.color2 : colors.color3);
      }
      return finalColor;
    }

    float segment = floor(noiseValue * 3.0);
    float localPos = fract(noiseValue * 3.0);

    float gradientThreshold = 0.8;
    vec3 currentColor, nextColor;

    if (segment == 0.0) {
      currentColor = colors.color1;
      nextColor = colors.color2;
    } else if (segment == 1.0) {
      currentColor = colors.color2;
      nextColor = colors.color3;
    } else {
      currentColor = colors.color3;
      nextColor = colors.color1;
    }
    if (localPos > gradientThreshold) {
      float t = (localPos - gradientThreshold) / (1.0 - gradientThreshold);
      return mix(currentColor, nextColor, t);
    }
    return currentColor;
  }

  void main() {
    vec3 color = vec3(0.0497, 0.4891, 0.3893);
    float a = 1.0;
    ColorSet colors = getActiveColorSet(uActiveColorSet);

    vec2 nUV = vPosition.xy * 0.01;
    nUV.x += uTime * 0.05;
    vec4 noise3 = texture2D(uNoiseTexture, nUV);

    if (uIsSphere == 1) {
      vec3 normal = normalize(vNormal);
      float phi = acos(normal.y);
      float theta = atan(normal.z, normal.x) + uTime * 0.1;

      vec2 noiseUV = vec2(theta / (3.1415926 * 2.0), phi / 3.1415926) * 0.5;

      // フロー場とワープ効果
      float timeScale = uTime * 0.7;
      vec2 baseFlow = flowField(noiseUV * 1.5, timeScale);
      vec2 detailFlow = flowField(noiseUV * 3.0 + baseFlow * 0.4, timeScale * 1.2);
      float flowStrength = 0.1;
      flowStrength += noise3.r*0.01;
      vec2 warpedUV = (baseFlow * 0.7 + detailFlow * 0.3) * flowStrength;

      // エッジ効果
      float edgeIntensity = dot(normal, vec3(0.0, 0.0, 1.0)) * 0.5 + 0.5;
      warpedUV += edgeIntensity * baseFlow * flowStrength * 1.5;

      // パターンのスケールとスピードの制御用パラメータ
      float allscale = 0.3;  // パターンの全体的なスケール
      float allspeed = 0.25;  // アニメーションの全体的な速度

      // パターン生成
      float noiseValue = generateSumiPattern(noiseUV + warpedUV, uTime * allspeed, allscale);
      color = calculateColor(noiseValue, colors, noiseUV, warpedUV, uTime);

    } else {
      if (vPosition.y < -90.0) {
        float t = (vPosition.y + 200.0) / 110.0;
        float maxX = mix(64.0, 0.0, t);
        if (length(vPosition.x) < maxX) {
          discard;
        }
      }
      color = normalize(vNormal).rgb;
      color = colors.color1;
    }

    // add noise
    color = blendSoftLight(color, vec3(noise3),0.7);

    color = linearToGamma(color, 2.2);
    gl_FragColor = vec4(color, a);
  }
`;

let scene: THREE.Scene;
let camera: THREE.OrthographicCamera;
let renderer: THREE.WebGLRenderer;
let mat1: THREE.ShaderMaterial;
let mat2: THREE.ShaderMaterial;
let leftCone: THREE.Mesh;
let rightSphere: THREE.Mesh;
let animationFrameId: number;
let clock: THREE.Clock;
const offsetTime: number = 0;
let lastLogTime = Math.floor(offsetTime);
const COLOR_CHANGE_INTERVAL = 15; // 色変更の間隔（秒）
let resizeTimeoutId: number | null = null;

// 基準サイズの定義
const BASE_SIZE = {
  width: 650,
  height: 320,
  coneRadius: 192,
  coneHeight: 330,
  sphereRadius: 165,
  coneOffset: { x: -146, y: -2 },
  sphereOffset: { x: 172, y: 2 },
};

// カラーセットの定義
const COLOR_SETS = {
  set1: {
    color1: "#0B745B",
    color2: "#16C787",
    color3: "#C6A167",
  },
  set2: {
    color1: "#4A056D",
    color2: "#B9B8E7",
    color3: "#EE7F88",
  },
  set3: {
    color1: "#E56D46",
    color2: "#FA8663",
    color3: "#004E4B",
  },
  set4: {
    color1: "#3741E4",
    color2: "#FF9301",
    color3: "#FFB2DC",
  },
};

const createMaterial = () => {
  const textureLoader = new THREE.TextureLoader();
  const noiseTexture2 = textureLoader.load(noise2);

  [noiseTexture2].forEach((texture) => {
    texture.wrapS = THREE.RepeatWrapping;
    texture.wrapT = THREE.RepeatWrapping;
  });

  return new THREE.ShaderMaterial({
    vertexShader,
    fragmentShader,
    transparent: true,
    uniforms: {
      uTime: { value: 0 },
      uIsSphere: { value: 0 },
      uNoiseTexture: { value: noiseTexture2 },
      uColorSet1: {
        value: {
          color1: new THREE.Color(COLOR_SETS.set1.color1),
          color2: new THREE.Color(COLOR_SETS.set1.color2),
          color3: new THREE.Color(COLOR_SETS.set1.color3),
        },
      },
      uColorSet2: {
        value: {
          color1: new THREE.Color(COLOR_SETS.set2.color1),
          color2: new THREE.Color(COLOR_SETS.set2.color2),
          color3: new THREE.Color(COLOR_SETS.set2.color3),
        },
      },
      uColorSet3: {
        value: {
          color1: new THREE.Color(COLOR_SETS.set3.color1),
          color2: new THREE.Color(COLOR_SETS.set3.color2),
          color3: new THREE.Color(COLOR_SETS.set3.color3),
        },
      },
      uColorSet4: {
        value: {
          color1: new THREE.Color(COLOR_SETS.set4.color1),
          color2: new THREE.Color(COLOR_SETS.set4.color2),
          color3: new THREE.Color(COLOR_SETS.set4.color3),
        },
      },
      uActiveColorSet: { value: 0 },
    },
  });
};

// ジオメトリを事前に作成
const coneGeometry = new THREE.ConeGeometry(
  BASE_SIZE.coneRadius,
  BASE_SIZE.coneHeight,
  128,
);

const sphereGeometry = new THREE.SphereGeometry(BASE_SIZE.sphereRadius, 64, 64);

const init = () => {
  if (!canvasRef.value) return;

  scene = new THREE.Scene();
  clock = new THREE.Clock();
  const aspectRatio = BASE_SIZE.width / BASE_SIZE.height;
  const viewSize = BASE_SIZE.height;
  const width = viewSize * aspectRatio;
  const height = viewSize;
  camera = new THREE.OrthographicCamera(
    -width / 2,
    width / 2,
    height / 2,
    -height / 2,
    0.1,
    9999,
  );
  camera.position.set(0, 0, 1000);
  camera.lookAt(0, 0, 0);

  renderer = new THREE.WebGLRenderer({
    canvas: canvasRef.value,
    alpha: true,
    antialias: true,
    powerPreference: "high-performance",
  });

  mat1 = createMaterial();
  mat2 = createMaterial();

  leftCone = new THREE.Mesh(coneGeometry, mat1);
  leftCone.rotation.x = Math.PI;
  scene.add(leftCone);

  if (mat2?.uniforms?.uIsSphere) {
    mat2.uniforms.uIsSphere.value = 1;
    rightSphere = new THREE.Mesh(sphereGeometry, mat2);
    scene.add(rightSphere);
  }

  handleResize();
};

const animate = () => {
  if (!animation) return;

  const elapsedTime = clock.getElapsedTime() + offsetTime;
  const currentSecond = Math.floor(elapsedTime);

  if (currentSecond > lastLogTime) {
    lastLogTime = currentSecond;
    if (currentSecond % COLOR_CHANGE_INTERVAL === 0) {
      const cSet = Math.floor(currentSecond / COLOR_CHANGE_INTERVAL) % 4;
      if (mat1?.uniforms?.uActiveColorSet)
        mat1.uniforms.uActiveColorSet.value = cSet;
      if (mat2?.uniforms?.uActiveColorSet)
        mat2.uniforms.uActiveColorSet.value = cSet;
    }
  }
  if (mat1?.uniforms?.uTime) mat1.uniforms.uTime.value = elapsedTime;
  if (mat2?.uniforms?.uTime) mat2.uniforms.uTime.value = elapsedTime;

  renderer.render(scene, camera);
  animationFrameId = requestAnimationFrame(animate);
};

const handleResize = () => {
  if (!canvasRef.value) return;

  // 前回のタイムアウトをキャンセル
  if (resizeTimeoutId !== null) {
    window.clearTimeout(resizeTimeoutId);
  }

  // 新しいタイムアウトを設定
  resizeTimeoutId = window.setTimeout(() => {
    const containerWidth = canvasRef.value?.clientWidth || 0;
    const aspectRatio = BASE_SIZE.width / BASE_SIZE.height;
    const containerHeight = containerWidth / aspectRatio;

    if (renderer) {
      renderer.setSize(containerWidth, containerHeight, false);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    }
    const scale = 0.95;
    if (leftCone && rightSphere) {
      leftCone.scale.set(scale, scale, scale);
      leftCone.position.x = BASE_SIZE.coneOffset.x * scale;
      leftCone.position.y = BASE_SIZE.coneOffset.y * scale;
      rightSphere.scale.set(scale, scale, scale);
      rightSphere.position.x = BASE_SIZE.sphereOffset.x * scale;
      rightSphere.position.y = BASE_SIZE.sphereOffset.y * scale;
    }
  }, 30);
};

const emit = defineEmits<{
  initialized: [];
}>();

onMounted(() => {
  requestAnimationFrame(() => {
    init();
    if (animation) {
      animationFrameId = requestAnimationFrame(animate);
    } else {
      renderer.render(scene, camera);
    }
    emit("initialized");
  });
  resizeObserver.value = new ResizeObserver((_entries) => {
    handleResize();
  });
  if (canvasRef.value) {
    resizeObserver.value.observe(canvasRef.value);
  }
});

onBeforeUnmount(() => {
  if (resizeTimeoutId !== null) {
    window.clearTimeout(resizeTimeoutId);
  }
  if (resizeObserver.value) {
    resizeObserver.value.disconnect();
  }
  if (animationFrameId) {
    cancelAnimationFrame(animationFrameId);
  }
  renderer?.dispose();
});
</script>

<template>
  <canvas ref="canvasRef" />
</template>

<style scoped>
canvas {
  width: 100%;
  height: auto;
  display: block;
  aspect-ratio: 650 / 320;
  min-width: 1px;
  max-width: 640px;
  min-height: 160px; /* モバイルサイズでの最小高さ */
}
</style>
