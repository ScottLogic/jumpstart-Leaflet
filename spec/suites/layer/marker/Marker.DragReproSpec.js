import {expect} from 'chai';
import {LayerGroup, LayersControl, LeafletMap, Marker, TileLayer} from 'leaflet';
import {createContainer, removeMapContainer} from '../../SpecHelper.js';

// Reproduction for https://github.com/ScottLogic/jumpstart-Leaflet/issues/291
// "Marker dragging is re-enabled when layerControl overlay is toggled off and on"
describe('Marker dragging re-enabled via LayersControl overlay toggle (issue #291)', () => {
	let map, container;

	beforeEach(() => {
		container = createContainer();
		map = new LeafletMap(container);
		map.setView([0, 0], 1);
	});

	afterEach(() => {
		removeMapContainer(map, container);
	});

	it('stays disabled when marker is removed and re-added via its layer group', () => {
		const marker = new Marker([0, 0], {draggable: true});
		const group = new LayerGroup([marker]);
		const base = new TileLayer('');
		new LayersControl({Base: base}, {Overlay: group}).addTo(map);

		base.addTo(map);
		group.addTo(map);

		expect(marker.dragging).to.exist;
		expect(marker.dragging.enabled()).to.be.true;

		// User-level: disable dragging on each marker in the group.
		group.eachLayer((layer) => {
			if (layer.dragging) { layer.dragging.disable(); }
		});
		expect(marker.dragging.enabled()).to.be.false;

		// Toggle overlay off (equivalent to unchecking overlay in the control).
		map.removeLayer(group);
		expect(map.hasLayer(marker)).to.be.false;

		// Toggle overlay back on.
		map.addLayer(group);
		expect(map.hasLayer(marker)).to.be.true;

		// Expected (per issue): dragging should remain disabled.
		expect(marker.dragging, 'marker.dragging should exist after re-add').to.exist;
		expect(
			marker.dragging.enabled(),
			'marker dragging should remain disabled after overlay toggle off/on'
		).to.be.false;
	});
});
