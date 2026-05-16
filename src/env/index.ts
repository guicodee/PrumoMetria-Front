import z from "zod";

export const envSchema = z.object({
  API_URL: z.string().default("https://localhost:7186/api"),
});

const _env = envSchema.safeParse(process.env);
if(!_env.success) {
  console.error("Invalid environment variable", _env.error.format());
  throw new Error("Invalid environment variables");
};

export const env = _env.data;
