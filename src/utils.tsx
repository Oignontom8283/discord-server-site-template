import Mustache from "mustache";
import type { DataContextType } from "./context";
import type z from "zod";
import type { textColorZodShemat } from "./shemat";

export function templateRenderContent(content:string, template: DataContextType): string {
    return Mustache.render(content, {
        guild: template.invite.guild,
        channel: template.invite.channel,
        user: template.invite.inviter,
        config: template.config
    })
}

export function textBackground(): string {
    return 'bg-transparent border-transparent backdrop-blur-none p-12 rounded-lg border hover:backdrop-blur-sm hover:bg-gray-700/70 hover:border-gray-800'
}

export function isTextColorWhite(color: z.infer<typeof textColorZodShemat>): boolean {
    return color === "light";
}