import { black, green, grey, lightOrange, orange } from "helpers/colors";
import { cells, columns, rows } from "./income-statement.json";
import annualTrend from "./annual-trend.json";
import ChartLegend from "components/chartLegend/chartLegend";
import CondensedReport from "components/condensedReport/condensedReport";
import FakeLoadingComponent from "components/fakeLoadingComponent/fakeLoadingComponent";
import LoadingChart from "components/loadingChart/loadingChart";
import LoadingTable from "components/loadingTable/loadingTable";
import ProfitAndLossChart from "components/profitAndLossChart/profitAndLossChart";
import React from "react";
import registerComponent from "helpers/registerComponent";

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
			borderColor: "#F00",
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
			borderColor: "#F00",
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
			<FakeLoadingComponent as="chartData" data={data} loader={<LoadingChart/>}>
				{({ chartData }) => (
					<>
						<ProfitAndLossChart ref={(ref) => (this.ref = ref)} chartData={chartData}/>
						<ChartLegend
							datasets={data.datasets}
							onToggleDataset={this.toggleDataset.bind(this)}
						/>
					</>
				)}

			</FakeLoadingComponent>
		);
	}
}

function CondensedIncomeStatement() {
	return <FakeLoadingComponent as="tableData" data={{}} loader={<LoadingTable/>}>
		<CondensedReport cells={cells} columns={columns} rows={rows}/>
	</FakeLoadingComponent>;
}

function ProfitAndLossExpanded() {
	return (
		<div className="widget-content expanded">
			<div>
				<h3>Overview chart</h3>
				<ProfitAndLoss/>
			</div>
			<div>
				<h3>Condensed P&L</h3>
				<CondensedIncomeStatement/>
			</div>
		</div>
	);
}

ProfitAndLossExpanded.nodeName = "finsit-profit-and-loss-expanded";

export default registerComponent(ProfitAndLossExpanded);
