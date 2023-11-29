import { CubeIcon } from "@radix-ui/react-icons";

function Footer() {
  return (
    <footer className=" p-4">
      <div className="container mx-auto">
        <div className="flex items-center justify-between">
          <p className="text-sm flex items-center gap-4">
            <CubeIcon className="h-6 w-6 violet" />© 2023 Workers management.
            All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
