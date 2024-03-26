
const tag = [
    'Free Wifi',
    'Air Conditioning',
    'Indoor pool',
    'Fitness center',
    'Restaurant'
  ];

function TourDetailDes()    {
    return(
        <div className="w-full flex-col ">
            {/* description */}
            <div className="py-3">
            Located in Seoul, a 5-minute walk from Bangsan Market, Nine Tree Hotel Dongdaemun provides concierge services and free WiFi throughout the property. The property is around a 17-minute walk from The Shilla Duty Free Shop Main Store, 1.2 miles from Myeongdong Station and 1.2 miles from Myeongdong Cathedral. The property has a 24-hour front desk, a business center and currency exchange for guests.
            The hotel will provide guests with air-conditioned rooms with a desk, an electric tea pot, a fridge, a safety deposit box, a flat-screen TV and a private bathroom with a bidet.
            A buffet breakfast is available each morning at Nine Tree Hotel Dongdaemun.
            Popular points of interest near the accommodation include Gwangjang Market, Dongdaemun Market and Jongmyo Shrine. The nearest airport is Gimpo International Airport, 12 miles from Nine Tree Hotel Dongdaemun.
            Couples in particular like the location – they rated it 8.8 for a two-person trip.
            </div>

            <div className="">
                <div className="font-semibold text-xl">
                    Amenities
                </div>
                <div className="w-1/5">
                    <div className="grid-rows-2 gap-2">
                    {tag.map((item, index) => (
                        <div key={index} className="transition-aorder bg-gray-300 text-gray-600 inline-flex h-8 items-center text-sm px-2 m-1 rounded-full">{item}</div>
                    ))}
                    </div>
                </div>
            </div>

        </div>
    )
}

export default TourDetailDes