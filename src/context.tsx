import React, { createContext, useState } from "react";
import type { DiscordInviteStatusV9 } from 'discord-guildpeek';
import type z from "zod";
import type { articlesZodShemat, configZodShemat, pagesZodShemat } from "./shemat";

export type DataContextType = {
  invite: DiscordInviteStatusV9;
  config: z.infer<typeof configZodShemat>;
  pages: z.infer<typeof pagesZodShemat>;
  articles: z.infer<typeof articlesZodShemat>;
  // others data for future use.
}

type DataContextValue = {
  data: DataContextType | null;
  setData: React.Dispatch<React.SetStateAction<DataContextType | null>>;
}

export const DataContext = createContext<DataContextValue>({
  data: null,
  setData: () => {},
});

export const DataProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [data, setData] = useState<DataContextType | null>(null);

  return (
    <DataContext.Provider value={{ data, setData }}>
      {children}
    </DataContext.Provider>
  );
};
