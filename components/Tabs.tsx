import { TabsEnum } from "@/types/enums"

export default function Tabs(
  { tab, setTab }:
  {
    tab: TabsEnum
    setTab: React.Dispatch<React.SetStateAction<TabsEnum>>
  }
) {
  return (
    <div className="flex flex-wrap gap-1">
      {
        Object.values(TabsEnum).map((tabName) => (
          <div
            key={tabName}
            className={`flex px-1 py-2 rounded-md items-center cursor-pointer duration-100 ${tab == tabName ? "bg-brand" : "bg-secondary"}`}
            onClick={() => setTab(tabName)}
          ><span>{tabName}</span></div>
        ))
      }
    </div>
  )
}