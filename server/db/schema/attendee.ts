import { sqliteTable, text, integer } from "drizzle-orm/sqlite-core";
import { users } from "./auth";

export const attendees = sqliteTable("attendee", {
  id: text("id").primaryKey().$defaultFn(() => crypto.randomUUID()),
  userId: text("user_id").references(() => users.id, { onDelete: "cascade" }).notNull(),
  email: text("email").notNull(),
  avatarUrl: text("avatar_url"),
  imageFileName: text("image_file_name"),
  displayName: text("display_name"),

  // NOTE: role is automatically determined later based on ticket number
  role: text("role", { enum: ["Attendee", "Attendee+Party", "Sponsor", "Speaker", "Staff"] }),

  // Speaker, Sponsor, Staff don't have a ticket number
  receiptId: text("receipt_id"),

  activatedAt: integer("activated_at", { mode: "timestamp" }),
  createdAt: integer("created_at", { mode: "timestamp" }).notNull().$defaultFn(() => new Date()),
  updatedAt: integer("updated_at", { mode: "timestamp" }).notNull().$defaultFn(() => new Date()),
  canceledAt: integer("canceled_at", { mode: "timestamp" }),
});
