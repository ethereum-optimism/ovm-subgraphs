# Optimism subgraphs

Each layer's subgraph has its own directory which shares the same name as the deployed subgraphs:
- `optimism-l1-subgraph`
- `optimism-l2-subgraph`

The package.json contains prep scripts that generate the subgraph.yaml files using subgraph.TEMPLATE.yaml depending on which network and/or layer you're targetting. It swaps out the contract addresses (can also be used for other dynamic data if needed, like start block).

### Adding tokens

1. Deploy token bridge contracts to layer 1 and 2 (if they don't exist yet). [Instructions here](https://community.optimism.io/docs/developers/integration.html#bridging-l1-and-l2).
2. Add the l1 & l2 bridge contracts in the `networks.yaml` file. No changes to the mapping files should be needed. 
3. Build the subgraphs by running `yarn prep:[network]`, `yarn codegen`, `yarn build`.
4. Please make a PR and the Optimism team will deploy (you would need `THE_GRAPH_API_KEY` to `yarn deploy`).