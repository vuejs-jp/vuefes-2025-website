import type { StoryFn } from "@storybook/vue3";
import VFToast, { useToast } from "./VFToast.vue";
import VFButton from "../button/VFButton.vue";

export default {
  title: "Components/VFToast",
  component: VFToast,
} as const;

export const Default: StoryFn = () => ({
  name: "VFToast",
  setup: () => {
    const toast = useToast();

    return () => (
      <div>
        <VFButton
          onClick={() =>
            toast.open({
              type: "success",
              message: "送信しました",
            })
          }
        >
          トーストを開く
        </VFButton>
        <VFToast state={toast.state.value} />
      </div>
    );
  },
});

export const Alert: StoryFn = () => ({
  name: "VFToast",
  setup: () => {
    const toast = useToast();

    return () => (
      <div>
        <VFButton
          onClick={() =>
            toast.open({
              type: "alert",
              message: "送信に失敗しました",
            })
          }
        >
          トーストを開く
        </VFButton>
        <VFToast state={toast.state.value} />
      </div>
    );
  },
});
