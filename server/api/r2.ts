import { GetObjectCommand, S3Client } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { defineEventHandler } from "h3";
import { useRuntimeConfig } from "#imports";

export default defineEventHandler(async () => {
  const { __FEATURE_TICKET_NAMECARD__ } = useRuntimeConfig();
  if (!__FEATURE_TICKET_NAMECARD__) return;

  const S3 = new S3Client({
    region: "auto",
    endpoint: `https://${process.env.CLOUDFLARE_ACCOUNT_ID}.r2.cloudflarestorage.com`,
    credentials: {
      accessKeyId: process.env.CLOUDFLARE_R2_ACCESS_KEY_ID!,
      secretAccessKey: process.env.CLOUDFLARE_R2_SECRET_ACCESS!,
    },
  });

  return await getSignedUrl(
    S3,
    new GetObjectCommand({
      Bucket: process.env.CLOUDFLARE_R2_BUCKET_NAME!,
      Key: "vue.png",
    }),
    { expiresIn: 3600 },
  );
});
