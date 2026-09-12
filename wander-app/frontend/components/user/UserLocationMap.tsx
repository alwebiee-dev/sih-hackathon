"use client"
import type { UserLocation } from "@/types/location";
import { 
  Map, 
  MapControls, 
  MapMarker,
  MarkerContent,
  MarkerPopup,
  MarkerLabel,
  MarkerTooltip, } from "@/components/ui/map";
import { Card } from "@/components/ui/card";
import { useState, useEffect } from "react";
import { placeLocations } from "@/lib/location/utils";
import { Button } from "@/components/ui/button";
import { Star, Navigation, Clock, ExternalLink } from "lucide-react";
import Image from "next/image";

const fallbackLocation:UserLocation = {
  id: 1,
  name: "You are here!",
  longitude: 77.6206658,
  latitude: 12.9291917
}

const mapStyles = {
  light: "https://tiles.openfreemap.org/styles/bright",
  dark: "https://tiles.openfreemap.org/styles/dark"
}

export function UserLocationMap() {
  const [userLocation, setUserLocation] = useState<UserLocation>(fallbackLocation)
  
  useEffect(() => {
    console.log(userLocation)
  }, [userLocation])

  return (
    <Card className="h-150 w-300 p-0 rounded-lg">
      <Map theme="light" center={[userLocation.longitude, userLocation.latitude]} zoom={15} styles={mapStyles}>
        <MapControls showLocate onLocate={(coords) => setUserLocation({...userLocation, longitude:coords.longitude, latitude:coords.latitude})} />
        {userLocation && (
          <MapMarker
            key={userLocation.id}
            longitude={userLocation.longitude}
            latitude={userLocation.latitude}
          >
            <MarkerContent>
              <div className="bg-blue-500 size-4 rounded-full border-2 border-white shadow-lg" />
            </MarkerContent>
            <MarkerTooltip>{userLocation.name}</MarkerTooltip>
            <MarkerPopup>
              <div className="space-y-1">
                <p className="text-foreground font-medium">{userLocation.name}</p>
                <p className="text-muted-foreground text-xs">
                  {userLocation.latitude.toFixed(4)}, {userLocation.longitude.toFixed(4)}
                </p>
              </div>
            </MarkerPopup>
          </MapMarker>
        )}
        {placeLocations.map((place) => (
          <MapMarker key={place.id} longitude={place.lng} latitude={place.lat}>
            <MarkerContent>
              <div className="bg-[#ff385c] size-5 cursor-pointer rounded-full border-2 border-white bg-rose-500 shadow-lg transition-transform hover:scale-110" />
              <MarkerLabel className="font-bold text-[#ff385c] bg-white px-3 rounded-lg" position="bottom">{place.label}</MarkerLabel>
            </MarkerContent>
            <MarkerPopup className="w-62 p-0">
              <div className="relative h-32 overflow-hidden rounded-t-md">
                <Image
                  fill
                  src={place.image}
                  alt={place.name}
                  className="object-cover"
                />
              </div>
              <div className="space-y-2 p-3">
                <div>
                  <p className="text-muted-foreground pb-0.5 text-[11px] font-medium tracking-wide uppercase">
                    {place.category}
                  </p>
                  <h3 className="text-foreground leading-tight font-semibold">
                    {place.name}
                  </h3>
                </div>
                <div className="flex items-center gap-3 text-sm">
                  <div className="flex items-center gap-1">
                    <Star className="size-3.5 fill-amber-400 text-amber-400" />
                    <span className="font-medium">{place.rating}</span>
                    <span className="text-muted-foreground">
                      ({place.reviews.toLocaleString()})
                    </span>
                  </div>
                </div>
                <div className="text-muted-foreground flex items-center gap-1.5 text-sm">
                  <Clock className="size-3.5" />
                  <span>{place.hours}</span>
                </div>
                <div className="flex gap-2 pt-1">
                  <Button size="sm" className="flex-1">
                    <Navigation className="size-3.5" />
                    Directions
                  </Button>
                  <Button size="icon-sm" variant="outline">
                    <ExternalLink className="size-3.5" />
                  </Button>
                </div>
              </div>
            </MarkerPopup>
          </MapMarker>
        ))}
      </Map>
    </Card>
  );
}
