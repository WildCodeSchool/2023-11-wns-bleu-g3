import { useRouter } from "next/router";
import ModalBin from "../backoffice/modalBin";

export default function ReportDropdown(mappedVar: any) {
  const router = useRouter();

  return (
    <div
      id="dropdownReport"
      className=" inset-y-0 end-0 z-10 absolute shadow w-44 text-sm font-medium"
    >
      <div className=" flex p-2 text-red-700 rounded-lg bg-lightPearl border border-opacity-60 border-reef focus:border-reef">
        <ModalBin expression="signaler" mappedVar={mappedVar} operation="" />
      </div>
    </div>
  );
}
