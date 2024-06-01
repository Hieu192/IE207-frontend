import { Fragment, useEffect, useState } from 'react';
import {
  Dialog,
  DialogPanel,
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
  Transition,
  TransitionChild,
} from '@headlessui/react';
import { XMarkIcon } from '@heroicons/react/24/outline';
import { ChevronDownIcon, FunnelIcon, MinusIcon, PlusIcon, Squares2X2Icon } from '@heroicons/react/20/solid';
import ProductCard from '../ProductCard';
import { useAppSelector } from '@/store';
import axiosInstance from '@/axios/axios';
import { ProductFromApi } from '@/scenes/admin/crud/products/Product';
import { useNavigate } from 'react-router-dom';
import ProductList from '../ProductList';
import { FormControl, FormControlLabel, Radio, RadioGroup } from '@mui/material';
import Search from './../Search/InputSearch';

interface SortOption {
  name: string;
  href: string;
  current: boolean;
}

interface SubCategory {
  name: string;
  href: string;
}

interface FilterOption {
  value: string;
  label: string;
  checked: boolean;
}

interface Filter {
  id: string;
  name: string;
  options: FilterOption[];
}

const sortOptions: SortOption[] = [
  { name: 'Most Popular', href: '#', current: true },
  { name: 'Best Rating', href: '#', current: false },
  { name: 'Newest', href: '#', current: false },
  { name: "Giá: Thấp đến cao", query: "price_low", current: false },
  { name: "Giá: Cao đến thấp", query: "price_high", current: false },
];


const filters: Filter[] = [
  {
    id: 'category',
    name: 'Category',
    options: [
      { value: 'Cơm', label: 'Cơm', checked: false },
      { value: 'Mì khô', label: 'Mì khô', checked: false },
      { value: 'Mì nước', label: 'Mì nước', checked: false },
      { value: 'Gà rán', label: 'Gà rán', checked: false },
    ],
  },
  {
    id: 'price',
    name: 'Price',
    options: [
      { value: '0-50000', label: '0-50.000 đ', checked: false },
      { value: '50000-100000', label: '0-50.000 đ', checked: false },
      { value: '100000-200000', label: '100.000-200.000 đ', checked: false },
      { value: '200000-500000', label: '200.000-500.000 đ', checked: false },
    ]
  }
];

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ');
}

const FilterPage: React.FC = () => {
  const navigate = useNavigate();
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  const idAccount = useAppSelector((state) => state.auth.idAccount);
  const [enableForceUserTypeOtherInfor, setEnableForceUserTypeOtherInfor] =
    useState(false) ;
  const [products, setProducts] = useState<ProductFromApi[]>([]);


  // const handleFilter = (value: string, sectionId: string) => {
  //   const searchParams = new URLSearchParams(location.search);
  //   let filterValues = searchParams.getAll(sectionId);
  //   console.log("sectionId", filterValues)

  //   if (filterValues.length > 0 && filterValues[0].split(",").includes(value)) {
  //     filterValues = filterValues[0]
  //       .split(",")
  //       .filter((item) => item !== value);
  //     if (filterValues.length === 0) {
  //       searchParams.delete(sectionId);
  //     }
  //     console.log("includes");
  //   } else {
  //     filterValues.push(value);
  //   }

  //   if (filterValues.length > 0)
  //     searchParams.set(sectionId, filterValues.join(","));

  //   const query = searchParams.toString();
  //   navigate({ search: `?${query}` });
  // };
  // const handleRadioFilterChange = (e, sectionId) => {
  //   const searchParams = new URLSearchParams(location.search);
  //   searchParams.set(sectionId, e.target.value);
  //   const query = searchParams.toString();
  //   navigate({ search: `?${query}` });
  // };

  const handleSortChange = (value: string) => {
    const searchParams = new URLSearchParams(location.search);
    searchParams.set("sort", value);
    const query = searchParams.toString();
    navigate({ search: `?${query}` });
  };

  const handleRadioFilterChange = (e: React.ChangeEvent<HTMLInputElement>, sectionId: string) => {
    const searchParams = new URLSearchParams(location.search);
    searchParams.set(sectionId, e.target.value);
    const query = searchParams.toString();
    navigate({ search: `?${query}` });
  };
  const decodedQueryString = decodeURIComponent(location.search);
  const searchParams = new URLSearchParams(decodedQueryString);
  const category = searchParams.get("category")
  const price = searchParams.get("price")
  const [minPrice, maxPrice] = price === null ? [0, 0] : price.split("-").map(Number);
  const sort = searchParams.get("sort")
  const search = searchParams.get("search")
  
  console.log("tesst param", category)
  console.log("tesst param", price)
  console.log("tesst param", minPrice, maxPrice)
  console.log("tesst param", sort)
  console.log("tesst param", search)

  async function getProductsByCategory() {
    try {
      console.log('test 2');
      const modifiedCategory = category.replace(/ /g, '+');
      // console.log('productArr: ', `/products/filterv?search=${search}&category=${modifiedCategory}&minPrice=${minPrice}&maxPrice=${maxPrice}&sort=${sort}`)
      const response = await axiosInstance.get(`/products/filterv?search=${search}&category=${modifiedCategory}&minPrice=${minPrice}&maxPrice=${maxPrice}&sort=${sort}`);
      const productArr = response.data as ProductFromApi[];
      console.log('productArr: ', productArr);

      setProducts(productArr);
    } catch (e) {
      console.log('error: ', e);
    }
  }

  async function getProductsBySearch() {
    try {
      console.log('test 1');
      const response = await axiosInstance.get(`/products/search?search=${search}`);
      const productArr = response.data as ProductFromApi[];
      console.log('productArr: ', productArr);
      setProducts(productArr);
    } catch (e) {
      console.log('error: ', e);
    }
  }
  useEffect(() => {
    void getProductsBySearch();

  }, []);

  useEffect(() => {
    void getProductsByCategory();

  }, [category, minPrice, maxPrice, sort, search]);

  async function checkRegisterRecently(idAccount: number | null) {
    try {
      const response = await axiosInstance.get(
        '/auth/checkUserRegisterRecently',
        {
          params: {
            idAccount: idAccount,
          },
        },
      );
      const isRegisterRecently = (await response.data) as boolean;
      if (isRegisterRecently) {
        console.log('isRegister recently', isRegisterRecently);
        setEnableForceUserTypeOtherInfor(true);
      } else {
        console.log('isRegister recently', isRegisterRecently);
      }
    } catch (err) {
      console.log('error: ', err);
    }
  }
  useEffect(() => {
    if (idAccount != null) {
      void checkRegisterRecently(idAccount);
    }
  }, [idAccount]);
  return (
    <div className="bg-white">
      <div>
        {/* Mobile filter dialog */}
        <Transition show={mobileFiltersOpen}>
          <Dialog className="relative z-40 lg:hidden" onClose={setMobileFiltersOpen}>
            <TransitionChild
              enter="transition-opacity ease-linear duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="transition-opacity ease-linear duration-300"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <div className="fixed inset-0 bg-black bg-opacity-25" />
            </TransitionChild>

            <div className="fixed inset-0 z-40 flex">
              <TransitionChild
                enter="transition ease-in-out duration-300 transform"
                enterFrom="translate-x-full"
                enterTo="translate-x-0"
                leave="transition ease-in-out duration-300 transform"
                leaveFrom="translate-x-0"
                leaveTo="translate-x-full"
              >
                <DialogPanel className="relative ml-auto flex h-full w-full max-w-xs flex-col overflow-y-auto bg-white py-4 pb-12 shadow-xl">
                  <div className="flex items-center justify-between px-4">
                    <h2 className="text-lg font-medium text-gray-900">Filters</h2>
                    <button
                      type="button"
                      className="-mr-2 flex h-10 w-10 items-center justify-center rounded-md bg-white p-2 text-gray-400"
                      onClick={() => setMobileFiltersOpen(false)}
                    >
                      <span className="sr-only">Close menu</span>
                      <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                    </button>
                  </div>

                  {/* Filters */}
                  <form className="mt-4 border-t border-gray-200">
                    <h3 className="sr-only">Categories</h3>
                    

                    {filters.map((section) => (
                      <Disclosure as="div" key={section.id} className="border-t border-gray-200 px-4 py-6">
                        {({ open }) => (
                          <>
                            <h3 className="-mx-2 -my-3 flow-root">
                              <DisclosureButton className="flex w-full items-center justify-between bg-white px-2 py-3 text-gray-400 hover:text-gray-500">
                                <span className="font-medium text-gray-900">{section.name}</span>
                                <span className="ml-6 flex items-center">
                                  {open ? (
                                    <MinusIcon className="h-5 w-5" aria-hidden="true" />
                                  ) : (
                                    <PlusIcon className="h-5 w-5" aria-hidden="true" />
                                  )}
                                </span>
                              </DisclosureButton>
                            </h3>
                            <DisclosurePanel className="pt-6">
                              <div className="space-y-6">
                                {section.options.map((option, optionIdx) => (
                                  <div key={option.value} className="flex items-center">
                                    <input
                                      id={`filter-mobile-${section.id}-${optionIdx}`}
                                      name={`${section.id}[]`}
                                      defaultValue={option.value}
                                      type="checkbox"
                                      defaultChecked={option.checked}
                                      className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                                      onChange={() =>
                                        handleFilter(option.value, section.id)
                                      }
                                    />
                                    <label
                                      htmlFor={`filter-mobile-${section.id}-${optionIdx}`}
                                      className="ml-3 min-w-0 flex-1 text-gray-500"
                                    >
                                      {option.label}
                                    </label>
                                  </div>
                                ))}
                              </div>
                            </DisclosurePanel>
                          </>
                        )}
                      </Disclosure>
                    ))}
                  </form>
                </DialogPanel>
              </TransitionChild>
            </div>
          </Dialog>
        </Transition>

        <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-baseline justify-between border-b border-gray-200 pb-6 pt-24">
            <h1 className="text-4xl font-bold tracking-tight text-gray-900">New Arrivals</h1>

            <div className="flex items-center">
              <Menu as="div" className="relative inline-block text-left">
                <div>
                  <MenuButton className="group inline-flex justify-center text-sm font-medium text-gray-700 hover:text-gray-900">
                    Sort
                    <ChevronDownIcon
                      className="-mr-1 ml-1 h-5 w-5 flex-shrink-0 text-gray-400 group-hover:text-gray-500"
                      aria-hidden="true"
                    />
                  </MenuButton>
                </div>

                <Transition
                  enter="transition ease-out duration-100"
                  enterFrom="transform opacity-0 scale-95"
                  enterTo="transform opacity-100 scale-100"
                  leave="transition ease-in duration-75"
                  leaveFrom="transform opacity-100 scale-100"
                  leaveTo="transform opacity-0 scale-95"
                >
                  <MenuItems className="absolute right-0 z-10 mt-2 w-40 origin-top-right rounded-md bg-white shadow-2xl ring-1 ring-black ring-opacity-5 focus:outline-none">
                    <div className="py-1">
                    {sortOptions.map((option) => (
                        <Menu.Item key={option.name}>
                          {({ active }) => (
                            <p
                              onClick={() => handleSortChange(option.query)}
                              className={classNames(
                                option.current
                                  ? "font-medium text-gray-900"
                                  : "text-gray-500",
                                active ? "bg-gray-100" : "",
                                "block px-4 py-2 text-sm cursor-pointer"
                              )}
                            >
                              {option.name}
                            </p>
                          )}
                        </Menu.Item>
                      ))}
                    </div>
                  </MenuItems>
                </Transition>
              </Menu>

              <button type="button" className="-m-2 ml-5 p-2 text-gray-400 hover:text-gray-500 sm:ml-7">
                <span className="sr-only">View grid</span>
                <Squares2X2Icon className="h-5 w-5" aria-hidden="true" />
              </button>
              <button
                type="button"
                className="-m-2 ml-4 p-2 text-gray-400 hover:text-gray-500 sm:ml-6 lg:hidden"
                onClick={() => setMobileFiltersOpen(true)}
              >
                <span className="sr-only">Filters</span>
                <FunnelIcon className="h-5 w-5" aria-hidden="true" />
              </button>
            </div>
          </div>

          <section aria-labelledby="products-heading" className="pb-24 pt-6">
            <h2 id="products-heading" className="sr-only">
              Products
            </h2>

            <div className="grid grid-cols-1 gap-x-8 gap-y-10 lg:grid-cols-4">
              {/* Filters */}
              <form className="hidden lg:block">
                <h3 className="sr-only">Categories</h3>
                
                {filters.map((section) => (
                    <Disclosure
                      // defaultOpen={true}
                      as="div"
                      key={section.id}
                      className="border-b border-gray-200 py-6"
                    >
                      {({ open }) => (
                        <>
                          <h3 className="-my-3 flow-root">
                            <Disclosure.Button className="flex w-full items-center justify-between bg-white py-3 text-sm text-gray-400 hover:text-gray-500">
                              <span className="font-medium text-gray-900">
                                {section.name}
                              </span>
                              <span className="ml-6 flex items-center">
                                {open ? (
                                  <MinusIcon
                                    className="h-5 w-5"
                                    aria-hidden="true"
                                  />
                                ) : (
                                  <PlusIcon
                                    className="h-5 w-5"
                                    aria-hidden="true"
                                  />
                                )}
                              </span>
                            </Disclosure.Button>
                          </h3>
                          <Disclosure.Panel className="pt-6">
                            <FormControl>
                              <RadioGroup
                                aria-labelledby="demo-radio-buttons-group-label"
                                defaultValue="female"
                                name="radio-buttons-group"
                              >
                                {section.options.map((option, optionIdx) => (
                                  <FormControlLabel
                                    value={option.value}
                                    control={<Radio />}
                                    label={option.label}
                                    onChange={(e) =>
                                      handleRadioFilterChange(e, section.id)
                                    }
                                  />
                                ))}
                              </RadioGroup>
                            </FormControl>
                          </Disclosure.Panel>
                        </>
                      )}
                    </Disclosure>
                  ))}
              </form>

              {/* Product grid */}
              <div className="lg:col-span-3">
                <ProductList products={products} />
              </div>
            </div>
          </section>
        </main>
      </div>
    </div>
  );
};

export default FilterPage;
