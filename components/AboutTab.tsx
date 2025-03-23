export default function SettingsTab(
  { show }: {
    show: boolean
  }
) {
  return (
    <div className={`p-2 ${!show && "hidden"}`}>
      App developed by Duyrep <br />
      <a className="text-brand" href="https://github.com/Duyrep/mindustry-calculator"><b>Github</b></a>
    </div>
  );
}