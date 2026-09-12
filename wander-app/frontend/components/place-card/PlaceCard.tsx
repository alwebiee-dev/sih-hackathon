import Image from "next/image"
import Link from "next/link"
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"

type Place = {
  id: number
  name: string
  category: string
  rating: number
  image: string
}

export function PlaceCard({ place }: { place: Place }) {
  return (
    <Card className="overflow-hidden transition-shadow hover:shadow-md w-100">
      <div className="relative h-48 w-full">
        <Image
          src={place.image}
          alt={place.name}
          fill
          className="object-cover"
        />
      </div>

      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <span className="text-sm text-muted-foreground">
            {place.category}
          </span>

          <span className="text-sm font-medium">
            ⭐ {place.rating}
          </span>
        </div>

        <CardTitle className="text-lg">
          {place.name}
        </CardTitle>
      </CardHeader>

      <CardContent>
        <p className="text-sm text-muted-foreground">
          {"Best place to visit"}
        </p>
      </CardContent>

      <CardFooter>
        <Button className="w-full">
          <Link href={`/places/${place.id}`}>
            View place
          </Link>
        </Button>
      </CardFooter>
    </Card>
  )
}