import { UserLocationMap } from "@/components/user/UserLocationMap";
import { Navbar } from "@/components/navbar/navbar";
import PlacesGrid from "@/components/place-card/PlaceGrid";

const HomePage = () => {
  return <div className="flex flex-col items-center p-0">
    <div className="p-3">
<Navbar />
    </div>
    <div className="p-5">
  <UserLocationMap />
    </div>
    <div className="p-5">
      <PlacesGrid />
    </div>
  </div>;
};

export default HomePage;
