import LayoutAdmin from "@/layouts/layout-admin";

export default function Dashboard() {
  return (
    <LayoutAdmin>
      <div className="max-w-[95rem] xl m-auto h-auto mt-14 ">
        <div className="flex flex-wrap justify-between ">
          <div className="w-[70%]    ">
            <div className="bg-white shadow-lg rounded-lg p-6 h-[35vh]">
              <h2 className="text-xl font-semibold mb-4">Donations</h2>
              <p> coming soon...</p>
            </div>
          </div>
          <div className="w-[27%]  ">
            <div className="bg-white shadow-lg rounded-lg p-6  h-[35vh]">
              <h2 className="text-xl font-semibold mb-4">Stats</h2>
              <p> coming soon...</p>
            </div>
          </div>
        </div>
        <div className="mt-6">
          <div className="bg-white shadow-lg rounded-lg p-6 h-[35vh]">
            <h2 className="text-xl font-semibold mb-4">Notifications</h2>
            <p>
            coming soon...
            </p>
          </div>
        </div>
      </div>
    </LayoutAdmin>
  );
}
