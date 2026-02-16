import React from 'react';
import TopSearchCard from '../../components/service/topsearch/TopSearchCard';

const TopSearch = () => {
    return (
        <div className="space-y-12 px-4 sm:px-6 lg:px-8">
            {/* Tag */}
            <div className="w-full flex items-center justify-center text-center">
                <h1 className="text-2xl sm:text-3xl text-neutral-800 font-bold">
                    Top Search <span className="text-primary">Routes</span>
                </h1>
            </div>

            {/* Top Search tickets routes card - Responsive grid */}
            <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 md:gap-6">
                <TopSearchCard routeFrom={"Mombasa"} routeTo={"Nairobi"} timeDuration={"8 Hrs"} price={"1600"} />
                <TopSearchCard routeFrom={"Nairobi"} routeTo={"Kisumu"} timeDuration={"6 Hrs"} price={"2000"} />
                <TopSearchCard routeFrom={"Kisumu"} routeTo={"Mombasa"} timeDuration={"15 Hrs"} price={"2500"} />
                <TopSearchCard routeFrom={"Nairobi"} routeTo={"Tanzania"} timeDuration={"13 Hrs"} price={"5000"} />
                <TopSearchCard routeFrom={"Kampala"} routeTo={"Nairobi"} timeDuration={"16 Hrs"} price={"4000"} />
                <TopSearchCard routeFrom={"Nairobi"} routeTo={"South Africa"} timeDuration={"20 Hrs"} price={"10,000"} />
            </div>
        </div>
    )
}

export default TopSearch