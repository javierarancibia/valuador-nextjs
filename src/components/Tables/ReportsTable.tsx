
import Image from "next/image";
import React from "react";

interface Report {
    _id: string,
    property: string,
    reference: string,
}

interface Props {
    reports: Report[]
}

const ReportsTable: React.FC<Props> = ({ reports }) => {
    return (
        <div className="rounded-sm border border-stroke mt-10 bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
        <div className="px-4 py-6 md:px-6 xl:px-7.5">
            <h4 className="text-xl font-semibold text-black dark:text-white">
            Top Products
            </h4>
        </div>

        <div className="grid grid-cols-6 border-t border-stroke px-4 py-4.5 dark:border-strokedark sm:grid-cols-8 md:px-6 2xl:px-7.5">
            <div className="col-span-3 flex items-center">
            <p className="font-medium">Product Name</p>
            </div>
            <div className="col-span-2 hidden items-center sm:flex">
            <p className="font-medium">Category</p>
            </div>
            <div className="col-span-1 flex items-center">
            <p className="font-medium">Price</p>
            </div>
            <div className="col-span-1 flex items-center">
            <p className="font-medium">Sold</p>
            </div>
            <div className="col-span-1 flex items-center">
            <p className="font-medium">Profit</p>
            </div>
        </div>

        {reports.map((report) => (
            <div
            className="grid grid-cols-6 border-t border-stroke px-4 py-4.5 dark:border-strokedark sm:grid-cols-8 md:px-6 2xl:px-7.5"
            key={report._id}
            >
            <div className="col-span-3 flex items-center">
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
                <div className="h-12.5 w-15 rounded-md">
                    {/* <Image
                    src={report.image}
                    width={60}
                    height={50}
                    alt="Product"
                    /> */}
                </div>
                <p className="text-sm text-black dark:text-white">
                    {report.property}
                </p>
                </div>
            </div>
            <div className="col-span-2 hidden items-center sm:flex">
                <p className="text-sm text-black dark:text-white">
                {report.property}
                </p>
            </div>
            <div className="col-span-1 flex items-center">
                <p className="text-sm text-black dark:text-white">
                ${report.property}
                </p>
            </div>
            <div className="col-span-1 flex items-center">
                <p className="text-sm text-black dark:text-white">{report.property}</p>
            </div>
            <div className="col-span-1 flex items-center">
                <p className="text-sm text-meta-3">${report.property}</p>
            </div>
            </div>
        ))}
        </div>
    );
};

export default ReportsTable;
