import PropTypes from "prop-types";

const RestaurantGallery = ({ image }) => {
  return (
    <section className="mt-5 grid gap-4 md:grid-cols-[minmax(0,2fr)_minmax(0,1fr)]">
      <img
        src={image}
        alt="Restaurant"
        className="h-[320px] w-full rounded-[2rem] object-cover shadow-[0_24px_60px_-40px_rgba(15,23,42,0.45)] md:h-[420px]"
      />
      <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-1">
        <div className="flex min-h-[200px] items-end rounded-[2rem] bg-[linear-gradient(135deg,#fb923c_0%,#ea580c_50%,#9a3412_100%)] p-6 text-white shadow-[0_24px_60px_-40px_rgba(234,88,12,0.65)]">
          <div>
            <p className="text-sm uppercase tracking-[0.25em] text-white/70">Order Online</p>
            <h3 className="mt-3 font-serif text-3xl leading-tight">Hot meals, fast arrival.</h3>
          </div>
        </div>
        <div className="rounded-[2rem] border border-orange-100 bg-white p-6 shadow-[0_24px_60px_-45px_rgba(15,23,42,0.35)]">
          <p className="text-sm uppercase tracking-[0.25em] text-orange-500">Why it stands out</p>
          <p className="mt-3 text-sm leading-7 text-slate-600">
            Rich cuisine tags, clear pricing, and detailed menu sections all flow directly from the search-service response.
          </p>
        </div>
      </div>
    </section>
  );
};

RestaurantGallery.propTypes = {
  image: PropTypes.string,
};

export default RestaurantGallery;
