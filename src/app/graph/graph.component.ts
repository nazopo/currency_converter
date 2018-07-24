import {Component, Output, OnChanges, Input, EventEmitter} from "@angular/core";

@Component({
    selector: 'cy-graph',
    templateUrl: './graph.component.html',
    styles: [`
      ng2-cytoscape {
        height: 100vh;
        float: left;
        width: 100%;
        position: relative;
    }`],
})

export class GraphComponent implements OnChanges {

    node_name: string;
    @Input() public elements: any;

    layout = {
                name: 'dagre',
                rankDir: 'LR',
                directed: true,
                padding: 0
            };

   graphData = { };
    

    constructor() { 
    }

    public ngOnChanges() {
    }

    ngOnInit() {
    }

    nodeChange(event) {
        this.node_name = event;
    }

}