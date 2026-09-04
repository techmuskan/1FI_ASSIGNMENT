export default function VariantSelector({
  colors,
  storages,
  selectedColor,
  selectedStorage,
  onColorChange,
  onStorageChange,
  variants,
}) {
  const storageAvailable = (storage) =>
    variants.some(
      (variant) =>
        variant.color === selectedColor && variant.storage === storage,
    );

  return (
    <div className="space-y-5">
      <fieldset>
        <legend className="mb-2 text-sm font-semibold text-slate-900">
          Colour
        </legend>
        <div className="flex flex-wrap gap-2">
          {colors.map((color) => {
            const variant = variants.find((item) => item.color === color);
            const selected = color === selectedColor;

            return (
              <button
                key={color}
                type="button"
                aria-pressed={selected}
                onClick={() => onColorChange(color)}
                className={`flex items-center gap-2 rounded-full border px-3 py-2 text-sm ${
                  selected
                    ? "border-brand-600 bg-brand-50 text-brand-700"
                    : "border-slate-200 bg-white hover:border-slate-300"
                }`}
              >
                <span
                  className="h-4 w-4 rounded-full border border-black/10"
                  style={{ backgroundColor: variant?.colorHex || "#111827" }}
                />
                {color}
              </button>
            );
          })}
        </div>
      </fieldset>

      <fieldset>
        <legend className="mb-2 text-sm font-semibold text-slate-900">
          Storage
        </legend>
        <div className="flex flex-wrap gap-2">
          {storages.map((storage) => {
            const selected = storage === selectedStorage;
            const available = storageAvailable(storage);

            return (
              <button
                key={storage}
                type="button"
                aria-pressed={selected}
                disabled={!available}
                onClick={() => onStorageChange(storage)}
                className={`rounded-full border px-4 py-2 text-sm ${
                  selected
                    ? "border-brand-600 bg-brand-50 font-semibold text-brand-700"
                    : available
                      ? "border-slate-200 bg-white hover:border-slate-300"
                      : "cursor-not-allowed border-slate-100 bg-slate-50 text-slate-400"
                }`}
              >
                {storage}
                {!available && (
                  <span className="ml-2 text-xs">Not Available</span>
                )}
              </button>
            );
          })}
        </div>
      </fieldset>
    </div>
  );
}
