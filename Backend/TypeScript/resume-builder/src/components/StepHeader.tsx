interface Props {
    step: number;
  }
  
  export default function StepHeader({
    step,
  }: Props) {
    const percentage =
      (step / 8) * 100;
  
    return (
      <div className="mb-10">
        <div className="flex justify-between mb-2.5">
          <span className="text-sm font-semibold text-slate-700">
            Step {step} of 8
          </span>
  
          <span className="text-sm font-bold text-indigo-600">
            {Math.round(percentage)}%
          </span>
        </div>
  
        <div className="h-2 bg-slate-200/80 rounded-full overflow-hidden">
          <div
            className="h-full bg-indigo-600 rounded-full transition-all duration-500 ease-out shadow-sm shadow-indigo-200"
            style={{
              width: `${percentage}%`,
            }}
          />
        </div>
      </div>
    );
  }