import {
  Card,
  CardHeader,
  Typography,
  CardBody,
  Chip,
  CardFooter,
  Tabs,
  TabsHeader,
  Tab,
  Avatar,
  Tooltip,
} from "@material-tailwind/react";
import { useState } from "react";
import { AiOutlineFall, AiOutlineRise } from "react-icons/ai";
import { useData } from "../context/DataContext";

const TABS = [
  {
    label: "Value",
    value: "value",
  },
  {
    label: "Quantity",
    value: "quantity",
  },
];

const TABLE_HEAD = ["Image", "Name", "Number", "Sales", "Trends", ""];



const TABLE_ROWS = [
  {
    img: "https://demos.creative-tim.com/test/corporate-ui-dashboard/assets/img/team-3.jpg",
    name: "UNO STRIPE - Pyjama set - Nufferton",
    online: 100,
    sale: "446464",
    number: "1224232",
  },
  {
    img: "https://demos.creative-tim.com/test/corporate-ui-dashboard/assets/img/team-2.jpg",
    name: "UNO STRIPE - Pyjama set - Nufferton",
    online: 120,
    sale: "446464",
    number: "1224232",
  },
  {
    img: "https://demos.creative-tim.com/test/corporate-ui-dashboard/assets/img/team-1.jpg",
    name: "UNO STRIPE - Pyjama set - Nufferton",
    online: -120,
    sale: "446464",
    number: "1224232",
  },
  {
    img: "https://demos.creative-tim.com/test/corporate-ui-dashboard/assets/img/team-4.jpg",
    name: "UNO STRIPE - Pyjama set - Nufferton",
    online: -20,
    sale: "446464",
    number: "1224232",
  },
  {
    img: "https://demos.creative-tim.com/test/corporate-ui-dashboard/assets/img/team-5.jpg",
    name: "UNO STRIPE - Pyjama set - Nufferton",
    online: 100,
    sale: "446464",
    number: "1224232",
  },
];

export function MembersTable() {
  const [tabValue, setTabValue] = useState("value");
  const { orders } = useData();
  return (
    <div className="px-4">
      <Card className="h-full w-full mt-20 bg-[#FCDDD6] border-y-[10px] border-[#FCDDD6] rounded-[60px]">
        <CardHeader
          floated={false}
          shadow={false}
          className="rounded-none bg-[#FCDDD6]"
        >
          <div className="flex items-center justify-between gap-5 pl-6 md:flex-row flex-col">
            <div>
              <Typography variant="h3" className="text-[#705048]">
                Best selling products
              </Typography>
              <Typography
                color="gray"
                className="mt-1 font-normal text-[#705048] text-lg"
              >
                Best selling products in the selected time period
              </Typography>
            </div>
            <Tabs value={tabValue} className="w-full md:w-max">
              <TabsHeader
                className="bg-[#FCDDD6] border-[#B17E71] border p-0"
                indicatorProps={{
                  className: `bg-[#B17E71] shadow-none rounded-none ${tabValue === TABS[0].value
                    ? "rounded-l-md"
                    : tabValue === TABS[TABS.length - 1].value
                      ? "rounded-r-md"
                      : ""
                    }`,
                }}
              >
                {TABS.map(({ label, value }, index) => (
                  <Tab
                    key={value}
                    value={value}
                    onClick={() => setTabValue(value)}
                    className={
                      tabValue === value ? "text-[#FCDDD6]" : "text-[#B17E71]"
                    }
                  >
                    &nbsp;&nbsp;{label}&nbsp;&nbsp;
                  </Tab>
                ))}
              </TabsHeader>
            </Tabs>
          </div>
        </CardHeader>
        <CardBody className="px-0 overflow-auto">
          <table className="mt-4 w-full min-w-max table-auto text-left">
            <thead className="bg-[#FCDDD6]">
              <tr>
                {TABLE_HEAD.map((head) => (
                  <th
                    key={head}
                    className="border-y border-[#FCDDD6] bg-[#FCDDD6] p-4"
                  >
                    <Typography
                      variant="small"
                      className="font-bold leading-none opacity-70 text-[#705048]"
                    >
                      {head}
                    </Typography>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {TABLE_ROWS.map(({ img, name, sale, number, online }, index) => {
                const isLast = index === TABLE_ROWS.length - 1;
                const classes = isLast
                  ? "p-4"
                  : "p-4 border-b border-blue-gray-50";

                return (
                  <tr key={name} className="odd:bg-white">
                    <td className={classes}>
                      <div className="flex items-center gap-3">
                        <Avatar src={img} alt={name} size="sm" />
                      </div>
                    </td>
                    <td className={classes}>
                      <div className="flex flex-col">
                        <Typography
                          variant="small"
                          className="font-normal text-[#705048]"
                        >
                          {name}
                        </Typography>
                      </div>
                    </td>
                    <td className={classes}>
                      <Typography
                        variant="small"
                        className="font-normal text-[#705048]"
                      >
                        {number}
                      </Typography>
                    </td>
                    <td className={classes}>
                      <Typography
                        variant="small"
                        className="font-normal text-[#705048]"
                      >
                        {sale}
                      </Typography>
                    </td>
                    <td className={classes}>
                      <div className="w-max">
                        <Chip
                          variant="filled"
                          size="sm"
                          value={
                            online < 0 ? (
                              <span className="inline-flex gap-1 items-center font-[600] text-[0.8rem]">
                                <AiOutlineFall /> {online}
                              </span>
                            ) : (
                              <span className="inline-flex gap-1 items-center font-[600] text-[0.8rem]">
                                <AiOutlineRise /> {online}
                              </span>
                            )
                          }
                          className="bg-[#F9B19F] rounded-full"
                        />
                      </div>
                    </td>
                    <td className={classes}>
                      <Tooltip content="Details of Sales">
                        <span className="font-[500] text-[#705048]">
                          Details
                        </span>
                      </Tooltip>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </CardBody>
        <CardFooter className="flex items-center justify-between border-t border-blue-gray-50 p-4">
          <div></div>
          <Typography
            variant="small"
            className="font-normal text-center text-[#705048] mr-6"
          >
            Showing TOP 5
          </Typography>
        </CardFooter>
      </Card>
    </div>
  );
}
