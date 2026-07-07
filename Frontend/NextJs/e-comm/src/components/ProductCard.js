import Link from "next/link";

import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

const ProductCard = ({ product }) => {
  return (
    <Card className="w-102 overflow-hidden rounded-xl transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
      <Link href={`/layout/products/${product.id}`}>
        <div className="relative flex h-56 items-center justify-center bg-muted p-6">
          <img
            src={product.image}
            alt={product.title}
            className="h-44 object-contain transition-transform duration-300 hover:scale-105"
          />
        </div>
      </Link>

      <CardContent className="space-y-4 pt-6">
        <Badge variant="secondary" className="capitalize">
          {product.category}
        </Badge>

        <h2 className="line-clamp-2 text-lg font-semibold">{product.title}</h2>

        <p className="line-clamp-3 text-sm text-muted-foreground">
          {product.description}
        </p>

        <div className="flex items-center justify-between text-sm">
          <span>⭐ {product.rating.rate}</span>
          <span className="text-muted-foreground">
            {product.rating.count} reviews
          </span>
        </div>
      </CardContent>

      <CardFooter className="flex items-center justify-between">
        <p className="text-2xl font-bold">${product.price}</p>

        <Button>Add to Cart</Button>
      </CardFooter>
    </Card>
  );
};

export default ProductCard;
