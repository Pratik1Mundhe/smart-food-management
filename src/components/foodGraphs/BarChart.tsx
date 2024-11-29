import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
} from "chart.js";
ChartJS.register(CategoryScale, LinearScale, BarElement);

interface BarPropTypes {
  wastageData: number[];
}

const BarChart: React.FC<BarPropTypes> = (props) => {
  const { wastageData } = props;
  const colors = wastageData.map((each) => {
    if (each <= 25) {
      return "green";
    } else if (each <= 50) {
      return "orange";
    }
    return "red";
  });
  const data = {
    labels: ["MON", "TUE", "WED", "THU", "FRI", "SAT", "SUN"],
    datasets: [
      {
        data: wastageData,
        backgroundColor: colors,
        borderRadius: 10,
        barThickness: 5,
        barHight: 20,
        barPercentage: 0.5,
      },
    ],
  };
  const options = {
    scales: {
      x: {
        grid: {
          display: false,
        },
      },
      y: {
        grid: {
          display: false,
        },
        ticks: {
          display: false,
        },
        min: -5,
      },
    },
  };

  return (
    <div className="w-[420px] h-[420px] mt-24">
      <Bar data={data} options={options} />
    </div>
  );
};

export default BarChart;
