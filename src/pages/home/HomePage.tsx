import CategoriesList from "./CategoriesList";
import ProductsList from "./ProductsList";

export default function HomePage() {

    return (
        <div className="md:flex">
            <div className="mt-4">
                <CategoriesList />
            </div>
            <ProductsList />
        </div>
    )
}