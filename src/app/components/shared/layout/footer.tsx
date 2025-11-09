import { requestInfo } from "rwsdk/worker";
import { getLocation } from "@/app/lib/location";

export const Footer = () => {
  const location = getLocation();

  const sameCity = location.city === location.colo;

  return (
    <footer className="text-center text-sm">
      <p>
        <span>
          {sameCity ? (
            <span>
              Served up fresh from a worker near you in{" "}
              <span className="font-bold">{location.city}</span>
            </span>
          ) : (
            <span>
              Served up fresh to you in <span className="font-bold">{location.city}</span> from a
              worker in <span className="font-bold">{location.colo}</span>
            </span>
          )}
        </span>
      </p>
      <span className="text-yellow">&copy; {new Date().getFullYear()}</span>
    </footer>
  );
};
