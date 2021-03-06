/* eslint-disable filenames/match-exported,filenames/match-regex */
import React from "react";
import style from "../style.scss";

/**
 * Inject WK style inside the shadow DOM
 */

const wkCssFundamentalsPath = "https://cdn.wolterskluwer.io/wk/fundamentals/1.x.x/all.min.css";
const wkCssComponentsPath = "https://cdn.wolterskluwer.io/wk/components/1.x.x/all.min.css";
const wkCssTypographyPath = "https://cdn.wolterskluwer.io/wk/fundamentals/1.x.x/typography.min.css";
const wkCssFiraSansPath = "https://cdn.wolterskluwer.io/wk/fundamentals/1.x.x/typography/fira-sans/all.min.css";
const wkCssFiraRegularPath = "https://cdn.wolterskluwer.io/wk/fundamentals/1.x.x/typography/fira-sans/regular.min.css";
const wkCssIconsPath = "https://cdn.wolterskluwer.io/wk/fundamentals/1.x.x/icons.min.css";

export default function withWKStyle(Component) {
	let fn = () => (
		<>
		  <link href={wkCssFundamentalsPath} rel="stylesheet"/>
		  <link href={wkCssFundamentalsPath} rel="stylesheet" />
		  <link href={wkCssComponentsPath} rel="stylesheet" />
		  <link href={wkCssTypographyPath} rel="stylesheet"/>
		  <link href={wkCssFiraSansPath} rel="stylesheet"/>
		  <link href={wkCssFiraRegularPath} rel="stylesheet"/>
		  <link href={wkCssIconsPath} rel="stylesheet"/>

		  <style>{style}</style>

		  <Component/>
		</>
	);

	fn.nodeName = Component.nodeName;
	eval("fn.propTypes = Component.propTypes || {};"); // eslint-disable-line no-eval
	return fn;
}
