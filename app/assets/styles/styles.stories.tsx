import type { Meta, StoryFn } from "@storybook/vue3";

export default {
  title: "BaseStyles",
  argTypes: { tooltip: { control: false } },
} satisfies Meta;

export const Styles: StoryFn = () => ({
  setup() {
    return () => (
      <>
        <div>
          <Colors />
          <Typography />
        </div>
      </>
    );
  },
});

const colorsStyle = `
  color: var(--color-white);
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 1rem;
`;
const colorStyle = `
  padding: 1rem;
  text-align: center;
  border-radius: 0.5rem;
  font-weight: bold;
`;
const Colors = () => (
  <>
    <h2>## Colors</h2>

    <h3>Base</h3>
    <div class="theme-base" style={colorsStyle}>
      <div style={colorStyle + "background: var(--color-primary);"}>
        Primary
      </div>
      <div style={colorStyle + "background: var(--color-purple);"}>Purple</div>
      <div style={colorStyle + "background: var(--color-orange);"}>Orange</div>
      <div style={colorStyle + "background: var(--color-navy);"}>Navy</div>
    </div>

    <h3>Sub</h3>
    <div class="theme-sub" style={colorsStyle}>
      <div style={colorStyle + "background: var(--color-primary);"}>
        Primary
      </div>
      <div style={colorStyle + "background: var(--color-purple);"}>Purple</div>
      <div style={colorStyle + "background: var(--color-orange);"}>Orange</div>
      <div style={colorStyle + "background: var(--color-navy);"}>Navy</div>
    </div>

    <h3>_common</h3>
    <div style={colorsStyle}>
      <div style={colorStyle + "background: var(--color-accent);"}>Accent</div>
      <div style={colorStyle + "background: var(--color-accent-hover);"}>
        Accent Hover
      </div>
      <div style={colorStyle + "background: var(--color-text-default);"}>
        Text Default
      </div>
      <div
        style={
          colorStyle +
          "color: var(--color-primary); background: var(--color-divider);"
        }
      >
        Divider
      </div>
      <div
        style={
          colorStyle +
          "color: var(--color-primary); background: var(--color-divider-light);"
        }
      >
        Divider Light
      </div>
      <div
        style={
          colorStyle +
          "color: var(--color-primary); background: var(--color-place-holder);"
        }
      >
        Place Holder
      </div>
      <div
        style={
          colorStyle +
          "color: var(--color-primary); background: var(--color-white);"
        }
      >
        White
      </div>
    </div>
  </>
);

const langsStyle = `
  margin: 1rem 0;
  border: 1px solid #ccc;
  padding: 1rem;
`;

const Typography = () => (
  <>
    <h2>## Typography</h2>

    <h3>Logo Font</h3>

    <div style={langsStyle}>
      <h1 style="font-family: ClashDisplay-SemiBold; margin: 0;s">
        Vue Fes Japan 2025
      </h1>
    </div>

    <h3>JA</h3>
    <div class="lang-ja" style={langsStyle}>
      <h3>Heading ja</h3>
      <h1>H1</h1>
      <h2>H2</h2>
      <h3>H3</h3>
      <p>
        BODY1 <br />
        昨日、スーパーで３つのApple製品と５個のバナナを購入し、友人のミカさんにEメールで報告しました。
      </p>
      <p class="text-body-2">
        BODY2 <br />
        昨日、スーパーで３つのApple製品と５個のバナナを購入し、友人のミカさんにEメールで報告しました。
      </p>
      <p class="text-body-3">
        BODY3 <br />
        昨日、スーパーで３つのApple製品と５個のバナナを購入し、友人のミカさんにEメールで報告しました。
      </p>
      <p class="text-caption">
        CAPTION <br />
        昨日、スーパーで３つのApple製品と５個のバナナを購入し、友人のミカさんにEメールで報告しました。
      </p>
    </div>

    <h3>EN</h3>
    <div class="lang-en" style={langsStyle}>
      <h3>Heading ja</h3>
      <h1>H1</h1>
      <h2>H2</h2>
      <h3>H3</h3>
      <p>
        BODY1 <br />
        The quick brown fox jumps over the lazy dog the quick brown fox jumps
        over the lazy dog.
      </p>
      <p class="text-body-2">
        BODY2 <br />
        The quick brown fox jumps over the lazy dog the quick brown fox jumps
        over the lazy dog.
      </p>
      <p class="text-body-3">
        BODY3 <br />
        The quick brown fox jumps over the lazy dog the quick brown fox jumps
        over the lazy dog.
      </p>
      <p class="text-caption">
        CAPTION <br />
        The quick brown fox jumps over the lazy dog the quick brown fox jumps
        over the lazy dog.
      </p>
    </div>
  </>
);
