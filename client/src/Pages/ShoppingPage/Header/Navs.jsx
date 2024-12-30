import {
  Link,
  useLocation,
  useNavigate,
  useSearchParams,
} from "react-router-dom";

const navs = [
  { id: "home", name: "Home", path: "/shop" },
  { id: "women", name: "Women", path: "/shop/products" },
  { id: "men", name: "Men", path: "/shop/products" },
  { id: "kids", name: "Kids", path: "/shop/products" },
  { id: "products", name: "products", path: "/shop/products" },
];

const Navs = () => {
  const navigate = useNavigate();

  const location = useLocation();
  const [searchParams, setSearchParams] = useSearchParams();

  const handleNavigateToProducts = async (categoryItem) => {
    sessionStorage.removeItem("filters");

    const currentFilter =
      categoryItem.id !== "home" && categoryItem.id !== "products"
        ? {
            category: [categoryItem.id],
          }
        : null;
    sessionStorage.setItem("filters", JSON.stringify(currentFilter));
    
    location.pathname.includes("products") && currentFilter !== null
      ? setSearchParams(new URLSearchParams(`?category=${categoryItem.id}`))
      : navigate(categoryItem.path);
  };

  return (
    <>
      {navs.map((nav, i) => {
        return (
          <label
            onClick={() => handleNavigateToProducts(nav)}
            className="text-sm font-semibold leading-6 text-gray-900 w-full  text-center p-1 rounded-sm cursor-pointer"
            key={i}
          >
            {nav.name}
          </label>
        );
      })}
    </>
  );
};

export default Navs;
