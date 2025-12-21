import { getLocation } from "@/app/lib/location";

export const Footer = () => {
  const location = getLocation();

  return (
    <footer className="text-center text-sm px-10">
      <p>
        <span>
          <span>
            Served up fresh from a worker in <span className="font-bold">{location.city}</span>
          </span>
        </span>
      </p>
      <span className="text-yellow">&copy; {new Date().getFullYear()}</span>
    </footer>
  );
};
