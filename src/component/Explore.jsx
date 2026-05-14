import React from "react";

export default function Explore() {
  return (
    <main
      className="pt-20 pb-24 px-4 min-h-screen"
      style={{ overflowY: "scroll", height: "80vh" }}
    >
      <div className="flex-1 overflow-y-auto p-4 md:p-8 custom-scrollbar">
        {/* <!-- Mobile Search Bar --> */}
        <div className="mb-6 md:hidden">
          <div className="relative">
            <span
              className="absolute left-3 top-1/2 -translate-y-1/2 text-stone-400 material-symbols-outlined"
              data-icon="search"
            >
              search
            </span>
            <input
              className="w-full pl-10 pr-4 py-3 bg-surface-container-low rounded-full border-none focus:ring-2 focus:ring-lime-400 font-body-sm text-on-surface"
              placeholder="Search friends..."
              type="text"
            />
          </div>
        </div>
        {/* <!-- Desktop Search (Original) - hidden on mobile --> */}
        <div className="hidden md:flex justify-end mb-8">
          <div className="relative group">
            <span
              className="absolute left-3 top-1/2 -translate-y-1/2 text-stone-400 material-symbols-outlined"
              data-icon="search"
            >
              search
            </span>
            <input
              className="pl-10 pr-4 py-2 bg-surface-container-low rounded-full border-none focus:ring-2 focus:ring-lime-400 w-64 transition-all focus:w-80 font-body-sm text-on-surface"
              placeholder="Search by name or phone..."
              type="text"
            />
          </div>
        </div>
        <section className="mb-10">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-display-sm font-display-sm text-on-surface">
              Spotlight Friends
            </h2>
            <button className="text-secondary font-label-bold flex items-center gap-1 hover:underline text-sm">
              View all{" "}
              <span
                className="material-symbols-outlined text-sm"
                data-icon="arrow_forward"
              >
                arrow_forward
              </span>
            </button>
          </div>
          {/* <!-- Horizontal scroll on mobile, grid on desktop --> */}
          <div className="flex md:grid md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 overflow-x-auto pb-4 md:pb-0 snap-x custom-scrollbar -mx-4 px-4 md:mx-0 md:px-0">
            <div className="flex-shrink-0 w-72 md:w-auto bg-white p-6 rounded-lg shadow-sm border border-stone-100 flex flex-col items-center text-center group hover:border-lime-400 transition-colors snap-center">
              <div className="relative mb-4">
                <img
                  className="w-20 h-20 md:w-24 md:h-24 rounded-full object-cover border-4 border-white shadow-md"
                  data-alt="Elena Rodriguez"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuAQcmDZewbXvKAJCa0YDT9Q42SA1CtrGjhRaRSy517T8LACBrvZEYPqrLRAJjdQr1VtPgkbm2_Mu-lpw8eTbaGxYy_EmeSrmcbqbJoBHmuP5HChICSPf6NUE13wXAnbWDlxbc7br-F6VzGb03aaDEHckJ4UUE7CopJXFnrU5J79RJg9oZ-mIHvOo3I6ojasrBxTWqS3dU3k6vt_q_rUt2Fk_hBx7wc23OZhLf8RcIk6sHs7WWxyZ3A3gnzmIiV2l4r1BY1U6wgXCSq7"
                />
                <div className="absolute bottom-1 right-1 w-5 h-5 bg-secondary rounded-full border-2 border-white"></div>
              </div>
              <h3 className="font-title-md text-title-md text-on-surface">
                Elena Rodriguez
              </h3>
              <p className="text-body-sm text-outline mb-4">
                Creative Director • NY
              </p>
              <div className="flex gap-2 w-full mt-auto">
                <button className="flex-1 bg-primary-container text-black py-2 rounded-full font-label-bold hover:scale-105 transition-transform text-sm">
                  Add Friend
                </button>
                <button className="p-2 rounded-full bg-surface-container-low text-on-surface-variant hover:bg-surface-container-high transition-colors">
                  <span
                    className="material-symbols-outlined"
                    data-icon="chat_bubble"
                  >
                    chat_bubble
                  </span>
                </button>
              </div>
            </div>
            <div className="flex-shrink-0 w-72 md:w-auto bg-white p-6 rounded-lg shadow-sm border border-stone-100 flex flex-col items-center text-center group hover:border-lime-400 transition-colors snap-center">
              <div className="relative mb-4">
                <img
                  className="w-20 h-20 md:w-24 md:h-24 rounded-full object-cover border-4 border-white shadow-md"
                  data-alt="Marcus Chen"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuAZ6Pn7ypWU02hux1Oc43ayRy_0p-YeT-Cj25MxrtCYvoltSR2HOwoSxRRD555kZ60Gr3_l-LuwpeidSrZaM3FZXHwvjocvh-w86G7L5XtH2sN6QA-jy9oUhtToYOGoTGgyGjUWDauLTSkfRw9qZJgOnGhj9R5cxC7ON1EGSuIB5F8n_PlyIm8GJenlan_4rOmOrAk-Gu1SNxJYH2VvZqFHDLOiI5FiWC1UKFAlvRc1h_k_woCntmE7n29AHni5uxztrIkLF2621HQh"
                />
                <div className="absolute bottom-1 right-1 w-5 h-5 bg-secondary rounded-full border-2 border-white"></div>
              </div>
              <h3 className="font-title-md text-title-md text-on-surface">
                Marcus Chen
              </h3>
              <p className="text-body-sm text-outline mb-4">
                Software Engineer • SF
              </p>
              <div className="flex gap-2 w-full mt-auto">
                <button className="flex-1 bg-primary-container text-black py-2 rounded-full font-label-bold hover:scale-105 transition-transform text-sm">
                  Add Friend
                </button>
                <button className="p-2 rounded-full bg-surface-container-low text-on-surface-variant hover:bg-surface-container-high transition-colors">
                  <span
                    className="material-symbols-outlined"
                    data-icon="chat_bubble"
                  >
                    chat_bubble
                  </span>
                </button>
              </div>
            </div>
            <div className="flex-shrink-0 w-72 md:w-auto bg-white p-6 rounded-lg shadow-sm border border-stone-100 flex flex-col items-center text-center group hover:border-lime-400 transition-colors snap-center">
              <div className="relative mb-4">
                <img
                  className="w-20 h-20 md:w-24 md:h-24 rounded-full object-cover border-4 border-white shadow-md"
                  data-alt="Zoe Amadi"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuA3T1ZLMV_9THeHv5yPni9Ron_LXcp_ApZcLH5XE1AsYAzTLkQ3pyopKgbU1FLg3jR-xp6_qWkLOWn9ZAnCKJ2nVvtdeIfPnNVTzyhiW9WOYbvchm7vl_Iy26F16SjMdiO3JxNGiUCxhJuqmLMPhrRzO5rRyadmK9Ckwl-zSU-MxCUWePNVY_fpoLgc8yeyD7eXtqWq-RJWBc5M5EvDqrAVO6sRnt4vKuhxHYA9TRPEe1I72_i71WSzCrc7JN0gvF93D_BiDcwasDLZ"
                />
                <div className="absolute bottom-1 right-1 w-5 h-5 bg-stone-300 rounded-full border-2 border-white"></div>
              </div>
              <h3 className="font-title-md text-title-md text-on-surface">
                Zoe Amadi
              </h3>
              <p className="text-body-sm text-outline mb-4">
                Product Designer • LDN
              </p>
              <div className="flex gap-2 w-full mt-auto">
                <button className="flex-1 bg-primary-container text-black py-2 rounded-full font-label-bold hover:scale-105 transition-transform text-sm">
                  Add Friend
                </button>
                <button className="p-2 rounded-full bg-surface-container-low text-on-surface-variant hover:bg-surface-container-high transition-colors">
                  <span
                    className="material-symbols-outlined"
                    data-icon="chat_bubble"
                  >
                    chat_bubble
                  </span>
                </button>
              </div>
            </div>
          </div>
        </section>
        <section className="mb-10">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-display-sm font-display-sm text-on-surface">
              Connect for More fun
            </h2>
          </div>
          <div className="bg-white rounded-lg shadow-sm border border-stone-100 divide-y divide-stone-50 overflow-hidden">
            <div className="flex items-center justify-between p-4 hover:bg-stone-50 transition-colors group">
              <div className="flex items-center gap-3">
                <img
                  className="w-12 h-12 rounded-full object-cover"
                  data-alt="Sarah Jenkins"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuCC2tgpy7FFoJd1gnzvzJNgK6GIVILnjuGX8TZS1hIlJvvfTRnuvrsjE7oTUQO36DzUFzwD_agwsEFKiuiOOXDXL-_WZuUKOjsiHlrW1LvDETNDH-Kbv08zi66IHRra_dQ1ereTbOtaJcsdH5iQAe_g71LuHBTasMq6AABgj5i7F5H6QdgKdfLcMDG9pWrHAVAJmc1my5PmpT9ZdfbTA3Gjka6SKNSSZdS4LPY_rVX_ylmeJcAcygl3EZ893MaghSTI1QndQk9PfPLr"
                />
                <div>
                  <h4 className="font-title-md text-body-md text-on-surface">
                    Sarah Jenkins
                  </h4>
                  <p className="text-caption-xs text-outline">
                    12 Mutual Friends
                  </p>
                </div>
              </div>
              <button className="px-3 py-1.5 rounded-full border border-primary text-primary font-label-bold text-xs hover:bg-primary hover:text-white transition-colors">
                Connect
              </button>
            </div>
            <div className="flex items-center justify-between p-4 hover:bg-stone-50 transition-colors group">
              <div className="flex items-center gap-3">
                <img
                  className="w-12 h-12 rounded-full object-cover"
                  data-alt="David Wilson"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuBn9YRC0LmhdgDZz0SuqUUWLwBn2ECusPawsbaxA7FpRgre6T1AD3j3wP4RH5OkQiayncBDbSuSZShaNg4rmejY7q96TSVUzQVNs9DmeychTI18H-EKGJpPfu43kuqvXSfFJpQvUlZli1xXY2E_a5Onz_jwvzFWpvaNggP68VXxwzmOjtzTImbswUipbJ4U6B2nzscXSo61MCm1e0xAKUvIJsHWB0zKMmCmvgYGGhzFAlAgFKT5dp3C_IWG7zGJq8yTdO_PK8VfhkUI"
                />
                <div>
                  <h4 className="font-title-md text-body-md text-on-surface">
                    David Wilson
                  </h4>
                  <p className="text-caption-xs text-outline">From contacts</p>
                </div>
              </div>
              <button className="px-3 py-1.5 rounded-full border border-primary text-primary font-label-bold text-xs hover:bg-primary hover:text-white transition-colors">
                Connect
              </button>
            </div>
            <div className="flex items-center justify-between p-4 hover:bg-stone-50 transition-colors group">
              <div className="flex items-center gap-3">
                <img
                  className="w-12 h-12 rounded-full object-cover"
                  data-alt="Amara Okafor"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuDK1XdC6V30kjgPNHP1ELkJauhHf8ACM3zREadnAOOPx1LGxcaO4Dnem4nytLotlikmsP_yh4sNBCXrUKZe3ItxZUIHqva1Nhc3KPIRv17VS1XS1W5J_2hSK8i72mHjqnwcQZm46oLLAt-Txz4ALBHwuYkWfnMmTplc02AEGqFNTNLS-TmidTxLbcUG6t3ZMyNiwaNhzigYvuJW_73Esb3cTNIaKUv6d-RLlozvombrVaJaTk2g5nmTY8Yx6UPk3kGKUKU4Mio3eLzp"
                />
                <div>
                  <h4 className="font-title-md text-body-md text-on-surface">
                    Amara Okafor
                  </h4>
                  <p className="text-caption-xs text-outline">
                    Works at Creative Lab
                  </p>
                </div>
              </div>
              <button className="px-3 py-1.5 rounded-full border border-primary text-primary font-label-bold text-xs hover:bg-primary hover:text-white transition-colors">
                Connect
              </button>
            </div>
          </div>
        </section>
        <section className="pb-10">
          <h2 className="text-display-sm font-display-sm text-on-surface mb-6">
            Discover by Interest
          </h2>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4">
            <div className="relative h-28 md:h-32 rounded-lg overflow-hidden group cursor-pointer">
              <img
                className="absolute inset-0 w-full h-full object-cover transition-transform group-hover:scale-110"
                data-alt="Coding"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuCIt8c67FbJmMepfcX6NEPM5S3YQfOJsS5dEPA7AmgLcOpm80jmOh-lNyv50c6F1Cvp-q4w6CbIEj-s9egcf_Gx9jYTLwPoePErtO7edRL260T0G6mJZBMyNgaJdDZePSaItFS56_j4Zok4spiYOB8R5fvHEk8r-o0mfzqw5sWErszYEUsLrpA10gudTcBi5IGP3Tpva0zDa9l6Z9C7S4jekNnrsMSd_jLJCIOQ-633rCgxX6Z-_yJnLSmXo1pOquy8MgQvETVaAJ61"
              />
              <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                <span className="text-white font-title-md text-sm md:text-title-md">
                  Coding
                </span>
              </div>
            </div>
            <div className="relative h-28 md:h-32 rounded-lg overflow-hidden group cursor-pointer">
              <img
                className="absolute inset-0 w-full h-full object-cover transition-transform group-hover:scale-110"
                data-alt="Art &amp; Design"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuAZGxCfGyNXLAXxkis0I1Rri6wDGqDsyfAmgS5cVXnL5eCBKJTzKpMzgpxFLe7uhulvuTz2X86LszIHqqNVJgiIxWIHWfYvK1pBcgTkjTQOxelhZlIMy0NLrG_90NmdItsR-nBPTSFn6sUcgOtYIzXkWAt1bdiHUyq21F0VEyGPM5TYqsD6pHn8UlRGiGUwLNkIqv50trpaYIBWe7nst9PLI97DI2aZCqgGzXt0kQDetqkgWmKHzyApJc6CXb478fhNKx8B0mQqlwvE"
              />
              <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                <span className="text-white font-title-md text-sm md:text-title-md text-center px-2">
                  Art &amp; Design
                </span>
              </div>
            </div>
            <div className="relative h-28 md:h-32 rounded-lg overflow-hidden group cursor-pointer">
              <img
                className="absolute inset-0 w-full h-full object-cover transition-transform group-hover:scale-110"
                data-alt="Music"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuC86bkLbyrBOTXBl92LkwWbguwq-ATvQRHium9PIdtSXEMpSdeNRKe4YpBTQnqFq2V7pDg54UwMpMyda_K5u4y2FQKzZ4ixqWqLeV8HVxbwoLJ76sVLOU-2gYBMZ-0YlDAiQURa_HEp4GcUA6q7NJ16hc9RSHpwXs3G-U-HbfGcUsiXJUlaHqXwYK16wp8h1IDGmaizt2wVbVxIMv9dhYqOQCh604su9YeFAMyOfsArqGEdwZeAcAjyDaWcVbeofH2pHuPa5Q_O9Zg5"
              />
              <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                <span className="text-white font-title-md text-sm md:text-title-md">
                  Music
                </span>
              </div>
            </div>
            <div className="relative h-28 md:h-32 rounded-lg overflow-hidden group cursor-pointer">
              <img
                className="absolute inset-0 w-full h-full object-cover transition-transform group-hover:scale-110"
                data-alt="Photography"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuA2dYfMphp3KG8BsqSGvoJNngOLfC2S5N_iNqKzvDUZEbB9rYNqx2tpdBLQMvtzmbXgO3vGf_x--D84VHFZpBZnFxdZjs40XOlUwJ28CxlQFyYxUR5Qh5WW9J4R6jqwxBrnKLr5B0fM24E2M3umB-tSkBTjVczbwhV4AcK5MYjaDQAllNY3QPVEZv9IgTwpGrm1VaXHULxwGKczAhdV7qHWH6sBTo8z0L4eeTb5z43wECYkZbAJ46In6A1-PVZNOG89A_KJuAa5tuxx"
              />
              <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                <span className="text-white font-title-md text-sm md:text-title-md">
                  Photography
                </span>
              </div>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
