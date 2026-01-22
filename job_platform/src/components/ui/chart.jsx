"use client";

import * as React from "react";
import * as RechartsPrimitive from "recharts";
import { cn } from "./utils";

/* -------------------- Themes -------------------- */

const THEMES = {
  light: "",
  dark: ".dark",
};

/* -------------------- Context -------------------- */

const ChartContext = React.createContext(null);

function useChart() {
  const context = React.useContext(ChartContext);

  if (!context) {
    throw new Error("useChart must be used within a <ChartContainer />");
  }

  return context;
}

/* -------------------- Chart Container -------------------- */

function ChartContainer({
  id,
  className,
  children,
  config,
  ...props
}) {
  const uniqueId = React.useId();
  const chartId = `chart-${id || uniqueId.replace(/:/g, "")}`;

  return (
    <ChartContext.Provider value={{ config }}>
      <div
        data-slot="chart"
        data-chart={chartId}
        className={cn(
          "[&_.recharts-cartesian-axis-tick_text]:fill-muted-foreground \
           [&_.recharts-cartesian-grid_line[stroke='#ccc']]:stroke-border/50 \
           [&_.recharts-curve.recharts-tooltip-cursor]:stroke-border \
           [&_.recharts-polar-grid_[stroke='#ccc']]:stroke-border \
           [&_.recharts-radial-bar-background-sector]:fill-muted \
           [&_.recharts-rectangle.recharts-tooltip-cursor]:fill-muted \
           flex aspect-video justify-center text-xs \
           [&_.recharts-dot[stroke='#fff']]:stroke-transparent \
           [&_.recharts-layer]:outline-hidden \
           [&_.recharts-sector]:outline-hidden \
           [&_.recharts-sector[stroke='#fff']]:stroke-transparent \
           [&_.recharts-surface]:outline-hidden",
          className
        )}
        {...props}
      >
        <ChartStyle id={chartId} config={config} />
        <RechartsPrimitive.ResponsiveContainer>
          {children}
        </RechartsPrimitive.ResponsiveContainer>
      </div>
    </ChartContext.Provider>
  );
}

/* -------------------- Chart Style (CSS Vars) -------------------- */

function ChartStyle({ id, config }) {
  const colorConfig = Object.entries(config).filter(
    ([, value]) => value.theme || value.color
  );

  if (!colorConfig.length) return null;

  return (
    <style
      dangerouslySetInnerHTML={{
        __html: Object.entries(THEMES)
          .map(
            ([theme, prefix]) => `
${prefix} [data-chart=${id}] {
${colorConfig
  .map(([key, item]) => {
    const color =
      (item.theme && item.theme[theme]) || item.color;
    return color ? `  --color-${key}: ${color};` : null;
  })
  .filter(Boolean)
  .join("\n")}
}
`
          )
          .join("\n"),
      }}
    />
  );
}

/* -------------------- Tooltip -------------------- */

const ChartTooltip = RechartsPrimitive.Tooltip;

function ChartTooltipContent({
  active,
  payload,
  className,
  indicator = "dot",
  hideLabel = false,
  hideIndicator = false,
  label,
  labelFormatter,
  labelClassName,
  formatter,
  color,
  nameKey,
  labelKey,
}) {
  const { config } = useChart();

  const tooltipLabel = React.useMemo(() => {
    if (hideLabel || !payload?.length) return null;

    const [item] = payload;
    const key = labelKey || item?.dataKey || item?.name || "value";
    const itemConfig = getPayloadConfigFromPayload(config, item, key);

    const value =
      !labelKey && typeof label === "string"
        ? config[label]?.label || label
        : itemConfig?.label;

    if (labelFormatter) {
      return (
        <div className={cn("font-medium", labelClassName)}>
          {labelFormatter(value, payload)}
        </div>
      );
    }

    return value ? (
      <div className={cn("font-medium", labelClassName)}>{value}</div>
    ) : null;
  }, [
    label,
    labelFormatter,
    payload,
    hideLabel,
    labelClassName,
    config,
    labelKey,
  ]);

  if (!active || !payload?.length) return null;

  const nestLabel = payload.length === 1 && indicator !== "dot";

  return (
    <div
      className={cn(
        "border-border/50 bg-background grid min-w-32 gap-1.5 rounded-lg border px-2.5 py-1.5 text-xs shadow-xl",
        className
      )}
    >
      {!nestLabel && tooltipLabel}

      <div className="grid gap-1.5">
        {payload.map((item, index) => {
          const key = nameKey || item.name || item.dataKey || "value";
          const itemConfig = getPayloadConfigFromPayload(config, item, key);
          const indicatorColor = color || item.payload?.fill || item.color;

          return (
            <div
              key={item.dataKey || index}
              className={cn(
                "flex flex-wrap items-center gap-2",
                indicator === "dot" && "items-center"
              )}
            >
              {!hideIndicator && (
                <div
                  className={cn(
                    "shrink-0 rounded-[2px]",
                    indicator === "dot" && "h-2.5 w-2.5",
                    indicator === "line" && "w-1 h-2.5",
                    indicator === "dashed" &&
                      "w-0 border border-dashed bg-transparent"
                  )}
                  style={{
                    backgroundColor: indicatorColor,
                    borderColor: indicatorColor,
                  }}
                />
              )}

              <div className="flex flex-1 justify-between">
                <span className="text-muted-foreground">
                  {itemConfig?.label || item.name}
                </span>
                {item.value != null && (
                  <span className="font-mono font-medium">
                    {item.value.toLocaleString()}
                  </span>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

/* -------------------- Legend -------------------- */

const ChartLegend = RechartsPrimitive.Legend;

function ChartLegendContent({
  className,
  hideIcon = false,
  payload,
  verticalAlign = "bottom",
  nameKey,
}) {
  const { config } = useChart();

  if (!payload?.length) return null;

  return (
    <div
      className={cn(
        "flex items-center justify-center gap-4",
        verticalAlign === "top" ? "pb-3" : "pt-3",
        className
      )}
    >
      {payload.map((item) => {
        const key = nameKey || item.dataKey || "value";
        const itemConfig = getPayloadConfigFromPayload(config, item, key);

        return (
          <div
            key={item.value}
            className="flex items-center gap-1.5"
          >
            {!hideIcon && itemConfig?.icon ? (
              <itemConfig.icon />
            ) : (
              <div
                className="h-2 w-2 rounded-[2px]"
                style={{ backgroundColor: item.color }}
              />
            )}
            {itemConfig?.label}
          </div>
        );
      })}
    </div>
  );
}

/* -------------------- Helpers -------------------- */

function getPayloadConfigFromPayload(config, payload, key) {
  if (!payload || typeof payload !== "object") return undefined;

  const payloadData =
    payload.payload && typeof payload.payload === "object"
      ? payload.payload
      : null;

  let resolvedKey = key;

  if (payload[key]) resolvedKey = payload[key];
  else if (payloadData && payloadData[key]) resolvedKey = payloadData[key];

  return config[resolvedKey] || config[key];
}

/* -------------------- Exports -------------------- */

export {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  ChartLegend,
  ChartLegendContent,
  ChartStyle,
};
