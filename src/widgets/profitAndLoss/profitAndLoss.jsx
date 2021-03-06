import { black, green, grey, lightOrange, orange } from "helpers/colors";
import annualTrend from "./annual-trend.json";
import FakeLoadingComponent from "components/fakeLoadingComponent/fakeLoadingComponent";
import LoadingChart from "components/loadingChart/loadingChart";
import ProfitAndLossChart from "components/profitAndLossChart/profitAndLossChart";
import React from "react";
import registerComponent from "helpers/registerComponent";
import ShowMoreButton from "components/showMoreButton/showMoreButton";

const dates = [
	new Date(2009, 0, 1),
	new Date(2009, 1, 1),
	new Date(2009, 2, 1),
	new Date(2009, 3, 1),
	new Date(2009, 4, 1),
	new Date(2009, 5, 1),
	new Date(2009, 6, 1),
	new Date(2009, 7, 1),
	new Date(2009, 8, 1),
	new Date(2009, 9, 1)
];

const data = {
	labels: dates,
	datasets: [
		{
			label: "Loss",
			data: annualTrend.profitTrend,
			hoverBackgroundColor: lightOrange,
			backgroundColor: orange,
			order: 2,
			yAxisID: "currency-axis",
			legendOrder: 0
		},
		{
			label: "YTD Profit",
			data: annualTrend.accumulatedProfitTrend,
			borderColor: green,
			backgroundColor: "#eee",
			type: "line",
			order: 0,
			yAxisID: "currency-axis",
			legendOrder: 1,
			pointRadius: 7,
			pointHoverRadius: 10,
			pointBorderWidth: 3,
			pointHoverBorderWidth: 3
		},
		{
			label: "Income",
			data: annualTrend.incomeTrend,
			hoverBackgroundColor: grey,
			backgroundColor: black,
			order: 1,
			yAxisID: "currency-axis",
			legendOrder: 2,
			hidden: true
		},
		{
			label: "YTD Income",
			data: annualTrend.accumulatedIncomeTrend,
			borderColor: black,
			backgroundColor: "#eee",
			type: "line",
			order: 3,
			yAxisID: "currency-axis",
			legendOrder: 3,
			hidden: true,
			pointRadius: 7,
			pointHoverRadius: 10,
			pointBorderWidth: 3,
			pointHoverBorderWidth: 3

		}
	]
};

class ProfitAndLoss extends React.Component {
	toggleDataset(dataset, index, { target }) {
		this.ref.toggleDataset(index);
		target.classList.toggle("inactive");
	}

	render() {
		return (
			<>
			  <div className="widget-toolbar">
				<div className="wk-button-group-right">
					<ShowMoreButton onTriggerExpandView={ProfitAndLoss.triggerExpandView} />
				</div>
			  </div>
			  <div className="widget-content">
				<FakeLoadingComponent as="chartData" data={data} loader={<LoadingChart/>}>
				  <ProfitAndLossChart ref={(ref) => (this.ref = ref)} small/>
				</FakeLoadingComponent>
			  </div>
			</>
		);
	}
}

ProfitAndLoss.nodeName = "finsit-profit-and-loss";

export default registerComponent(ProfitAndLoss);
