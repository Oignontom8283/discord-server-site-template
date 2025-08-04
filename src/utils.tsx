import Mustache from "mustache";
import type { DataContextType } from "./context";

export function templateRenderContent(content:string, template: DataContextType): string {
    return Mustache.render(content, {
        guild: template.invite.guild,
        channel: template.invite.channel,
        user: template.invite.inviter,
        config: template.config
    })
}

export function textBackground(): string {
    return 'hover:backdrop-blur-sm hover:bg-gray-700/70 hover:border-gray-800'
}