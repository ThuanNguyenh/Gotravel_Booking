/* eslint-disable no-unused-vars */
import { Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, Button, Card, CardBody, Image, Slider } from "@nextui-org/react";
import { LocationIcon } from "../assets/LocationIcon";
import { useMemo, useState} from "react";


function Search() {

    const [cities, setCities] = useState([
        { id: 1, name: 'Paris', nation: 'France', price: 9 },
        { id: 2, name: 'Tokyo', nation: 'Japan', price: 15 },
        { id: 3, name: 'New York', nation: 'USA', price: 29 },
        { id: 4, name: 'London', nation: 'UK', price: 35 },
        { id: 5, name: 'Sydney', nation: 'Australia', price: 46 },
        { id: 6, name: 'Rome', nation: 'Italy', price: 55 },
        { id: 7, name: 'Berlin', nation: 'Germany', price: 78 },
        { id: 8, name: 'Beijing', nation: 'China', price: 42 },
        { id: 9, name: 'Moscow', nation: 'Russia', price: 67 },
        { id: 10, name: 'Rio de Janeiro', nation: 'Brazil', price: 88 }
    ]);

    const [selectedKeys, setSelectedKeys] = useState(new Set(["Sort by"]));

    const selectedValue = useMemo(
        () => Array.from(selectedKeys).join(", ").replaceAll("_", " "),
        [selectedKeys]
    );

    const [filters, setFilters] = useState({
        nations: [],
        priceRange: [0, 50]
    });

    const handleNationChange = (e) => {
        const nation = e.target.value;
        let updatedNations = [...filters.nations];

        if (e.target.checked) {
            updatedNations.push(nation);
        } else {
            updatedNations = updatedNations.filter(item => item !== nation);
        }

        setFilters(prevFilters => ({
            ...prevFilters,
            nations: updatedNations,
        }));
    };

    const handlePriceRangeChange = (values) => {
        setFilters(prevFilters => ({
            ...prevFilters,
            priceRange: values
        }));
    };

    const filteredCities = cities.filter(city => {
        if (
            (filters.nations.length === 0 || filters.nations.includes(city.nation)) &&
            (city.price >= filters.priceRange[0] && city.price <= filters.priceRange[1])
        ) {
            return true;
        }
        return false;
    });

    return (
        <div className="grid grid-cols-6 md:grid-cols-12 md:gap-4">
            {/* Filter table */}
            <div className="flex flex-col col-span-3 md:col-span-3 pt-3">
                <Card className="p-5 gap-3">
                    <div className="font-semibold text-xl">Sort by</div>
                    <div className="flex flex-col">
                        <h2 className="text-lg font-semibold mb-2">Nation</h2>
                        <label className="block mb-1">
                            <input type="checkbox" value="France" onChange={handleNationChange} />
                            <span className="ml-2">France</span>
                        </label>
                        <label className="block mb-1">
                            <input type="checkbox" value="Japan" onChange={handleNationChange} />
                            <span className="ml-2">Japan</span>
                        </label>
                        <label className="block mb-1">
                            <input type="checkbox" value="USA" onChange={handleNationChange} />
                            <span className="ml-2">USA</span>
                        </label>
                        <label className="block mb-1">
                            <input type="checkbox" value="UK" onChange={handleNationChange} />
                            <span className="ml-2">UK</span>
                        </label>
                        <label className="block mb-1">
                            <input type="checkbox" value="Australia" onChange={handleNationChange} />
                            <span className="ml-2">Australia</span>
                        </label>
                    </div>

                    <div className="flex flex-col">
                        <Slider
                            className="text-lg font-semibold mb-2"
                            label= "Price Range"
                            size="sm"
                            hideThumb= {true}
                            min={0}
                            max={100}
                            step={5}
                            defaultValue={[10, 20]} 
                            formatOptions={{style: "currency", currency: "USD"}}
                            values={filters.priceRange}
                            onChange={handlePriceRangeChange}
                        />
                    </div>
                </Card>
            </div>
            {/* List Filtered */}
            <div className="flex flex-col col-span-9 md:col-span-9 gap-3">
                <div className="flex justify-between p-3 items-center">
                    <div className="font-thin">
                        We found <span className="font-semibold">{filteredCities.length}</span> tours for you.
                    </div>
                    <div>
                        <Dropdown>
                            <DropdownTrigger>
                                <Button variant="bordered">{selectedValue}</Button>
                            </DropdownTrigger>
                            <DropdownMenu
                                variant="flat"
                                disallowEmptySelection
                                selectionMode="single"
                                selectedKeys={selectedKeys}
                                onSelectionChange={setSelectedKeys}
                            >
                                <DropdownItem key="Newest">Newest</DropdownItem>
                                <DropdownItem key="Oldest">Oldest</DropdownItem>
                            </DropdownMenu>
                        </Dropdown>
                    </div>
                </div>
                {filteredCities.map(city => (
                    <Card
                        key={city.id}
                        isBlurred
                        className="border-none bg-background/60 dark:bg-default-100/50"
                        shadow="sm"
                    >
                        <CardBody>
                            <div className="grid grid-cols-6 md:grid-cols-12 md:gap-4 items-center justify-center">
                                <div className="relative col-span-3 md:col-span-3">
                                    <Image
                                        height={150}
                                        shadow="md"
                                        src="https://img.directbooking.ro/getimage.ashx?f=Statiuni&w=600&h=399&file=Statiune_2cc49871-736f-43c5-a388-b4d0c4d1c06b.jpg"
                                        width="100%"
                                    />
                                </div>

                                <div className="flex flex-col col-span-5 md:col-span-5">
                                    <div className="flex flex-col justify-between gap-5">
                                        <div className="flex flex-col gap-0">
                                            <h3 className="font-semibold text-2xl text-foreground/90">{city.name}</h3>
                                            <div className="flex flex-row">
                                                <LocationIcon/>
                                                <p className="text-small text-foreground/80 text-[#73D8FC]">{city.nation}</p>
                                            </div>
                                        </div>

                                        <div className="flex flex-row bg-slate-100 w-fit gap-5 p-3 justify-between text-medium font-lights text-slate-500">
                                            <div>
                                                <h1 className="">Check in</h1>
                                                <h1 className="">Date</h1>
                                            </div>
                                            <div>
                                                <h1 className="">Check out</h1>
                                                <h1 className="">Date</h1>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="flex flex-col col-span-4 md:col-span-4 items-end gap-5 text-right h-full  justify-between">
                                    <div className="font-semibold text-2xl text-foreground/90">${city.price}/night</div>
                                    <div>
                                        <Button className="bg-[#73D8FC] text-large text-white font-medium">Reserve Now</Button>
                                    </div>
                                </div>
                            </div>
                        </CardBody>
                    </Card>
                ))}
            </div>
        </div>
    );
}

export default Search;

