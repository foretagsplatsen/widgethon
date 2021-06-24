/**
 * @module registerComponent
 */

import React from "react";
import ReactDOM from "react-dom";
import reactToWebComponent from "react-to-webcomponent";
import withWKStyle from "hoc/withWKStyle";

export default function registerComponent(reactComponent) {
	let name = reactComponent.nodeName;
	let componentWithStyles = withWKStyle(reactComponent);

	if (!name) {
		throw new Error("Missing nodeName");
	}

	if (customElements.get(name)) {
		return componentWithStyles;
	}

	const WebComponent = reactToWebComponent(componentWithStyles, React, ReactDOM, { shadow: true });

	const expandView = Symbol("expandView");

	class WithCustomEvent extends WebComponent {
		constructor(...args) {
			super(...args);

			reactComponent.triggerExpandView = () => this[expandView]();
		}

		[expandView]() {
			let expandViewEvent = new CustomEvent("expandedviewopened", {
				detail: "expanded view triggered from sample web component"
			});

			this.dispatchEvent(expandViewEvent);
		}
	}

	customElements.define(name, WithCustomEvent);

	// Only for storybook, in webcomponents, it gets overridden line 30;
	reactComponent.triggerExpandView = () => {
		if (componentWithStyles.triggerExpandView) {
			componentWithStyles.triggerExpandView();
		}
	};
	return componentWithStyles;
}
