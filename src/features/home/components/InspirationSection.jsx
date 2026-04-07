import PropTypes from "prop-types";
import { menu_list } from "../../../assets/assets";

const InspirationSection = ({ topCuisines }) => {
  const highlights = topCuisines.length
    ? topCuisines.join(" / ")
    : "Fresh picks / quick bites / comfort classics";

  return (
    <section className="py-10">
      <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.28em] text-orange-500">
            Explore moods
          </p>
          <h2 className="mt-2 text-3xl font-semibold text-slate-950 sm:text-4xl">
            Start with what sounds good right now
          </h2>
        </div>
        <p className="max-w-xl text-sm leading-6 text-slate-500">
          Browse popular cravings and jump into a feed shaped around {highlights}.
        </p>
      </div>

      <div className="grid grid-cols-2 gap-4 sm:grid-cols-4 xl:grid-cols-8">
        {menu_list.map((item, index) => (
          <div
            key={item.menu_name}
            className="group relative overflow-hidden rounded-[1.75rem] border border-orange-100/80 bg-white p-4 shadow-[0_18px_50px_-38px_rgba(15,23,42,0.32)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_24px_60px_-32px_rgba(234,88,12,0.32)]"
          >
            <div
              className={`absolute inset-x-0 top-0 h-20 bg-gradient-to-br ${
                index % 4 === 0
                  ? "from-orange-100 via-orange-50 to-white"
                  : index % 4 === 1
                    ? "from-amber-100 via-rose-50 to-white"
                    : index % 4 === 2
                      ? "from-lime-100 via-white to-white"
                      : "from-sky-100 via-cyan-50 to-white"
              }`}
            />
            <div className="relative flex flex-col items-center text-center">
              <div className="rounded-full bg-white p-2 shadow-lg shadow-orange-100/60">
                <img
                  src={item.menu_image}
                  alt={item.menu_name}
                  className="h-20 w-20 rounded-full object-cover transition duration-300 group-hover:scale-105"
                />
              </div>
              <span className="mt-4 text-sm font-semibold text-slate-800">
                {item.menu_name}
              </span>
              <span className="mt-1 text-xs uppercase tracking-[0.24em] text-slate-400">
                Pick #{index + 1}
              </span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

InspirationSection.propTypes = {
  topCuisines: PropTypes.arrayOf(PropTypes.string),
};

InspirationSection.defaultProps = {
  topCuisines: [],
};

export default InspirationSection;
