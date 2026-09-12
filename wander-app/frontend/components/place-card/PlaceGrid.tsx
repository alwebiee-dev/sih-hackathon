import { PlaceCard } from "@/components/place-card/PlaceCard"
import { placeLocations } from "@/lib/location/utils"

export default function PlacesGrid() {
  return (
    <section className="p-5">
      <div className="mb-6">
        <h2 className="text-2xl font-bold">
          Places near you
        </h2>

        <p className="mt-1 text-sm text-muted-foreground">
          Discover restaurants, cafes and shops around you.
        </p>
      </div>

      <div className="grid gap-5 grid-cols-3">
        {placeLocations.map((place) => (
          <PlaceCard key={place.id} place={place} />
        ))}
      </div>
    </section>
  )
}