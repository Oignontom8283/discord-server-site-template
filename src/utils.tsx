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