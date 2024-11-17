import React, { useEffect, useState } from "react";
import { Dropdown } from "flowbite-react";
import Import from "../assets/images/import.svg";
import { useData } from "./context/DataContext";
import axios from "axios";
const Afilters = () => {
    const { orders, categories, loading } = useData();
    const [itemsData, setItemsData] = useState([]);
    // Assuming `orders` is the array of orders retrieved from `/api/zalando-data`
    const fetchOrderDescriptions = async () => {
        // Prepare the array of order-item pairs
        const allOrderItemIds = orders.flatMap(order =>
            order.relationships.order_items.data.map(item => ({
                orderId: order.id,
                itemId: item.id
            }))
        );
        console.log(allOrderItemIds);

        try {
            // Send `allOrderItemIds` directly in the body
            const response = await axios.post('http://localhost:5000/api/zalando-data/descriptions', { allOrderItemIds });
            setItemsData(response.data); // Access response data correctly
        } catch (error) {
            console.error('Error fetching orders:', error);
        }
    };

    useEffect(() => {
        // Check if orders is populated and not empty
        if (orders && orders.length > 0) {
            fetchOrderDescriptions();
        }
        // Empty dependency array to prevent reruns
    }, [orders]);



    return (
        <>
            <div className="p-[16px] flex justify-between items-center py-8 flex-wrap">
                <span className="text-[30px] font-[600]">Articles</span>
                <div className="flex items-center md:gap-3 gap-2 flex-wrap">
                    {/* <Button color="gray" onClick={toggleDatepicker}>
          Date Range
        </Button> */}

                    <Dropdown color="gray" label="Category">
                        {categories?.length > 0 ? (
                            categories?.map((category, index) => (
                                <Dropdown.Item key={index}>{category.name.en}</Dropdown.Item>
                            ))
                        ) : (
                            <>
                                <Dropdown.Item>No Categories Found</Dropdown.Item>

                            </>
                        )}
                    </Dropdown>
                    <Dropdown color="gray" label="Performes">
                        <Dropdown.Item>USA</Dropdown.Item>
                        <Dropdown.Item>UK</Dropdown.Item>
                        <Dropdown.Item>Russia</Dropdown.Item>
                    </Dropdown>
                    <Dropdown color="gray" label="Sustainable Tags">
                        <Dropdown.Item>Dollar</Dropdown.Item>
                        <Dropdown.Item>Pound</Dropdown.Item>
                        <Dropdown.Item>Ruble</Dropdown.Item>
                    </Dropdown>
                    <Dropdown color="gray" label="Stock">
                        <Dropdown.Item>Dollar</Dropdown.Item>
                        <Dropdown.Item>Pound</Dropdown.Item>
                        <Dropdown.Item>Ruble</Dropdown.Item>
                    </Dropdown><Dropdown color="gray" label="Warehouse">
                        <Dropdown.Item>Dollar</Dropdown.Item>
                        <Dropdown.Item>Pound</Dropdown.Item>
                        <Dropdown.Item>Ruble</Dropdown.Item>
                    </Dropdown>
                    <Dropdown color="gray" label="Names">
                        <Dropdown.Item>Dollar</Dropdown.Item>
                        <Dropdown.Item>Pound</Dropdown.Item>
                        <Dropdown.Item>Ruble</Dropdown.Item>
                    </Dropdown>
                    <button className="export-btn">
                        <img src={Import} alt="" />
                        Export
                    </button>
                </div>
            </div>
        </>
    );
};

export default Afilters;