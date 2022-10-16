# Observability Demo with prometheus and grafana

**Observability** is the capability of knowing what's happening 
in the system from the outside. 

### Metrics:

- **Counters**:   
  A metric that always increment or always decrement.  
  We are not interested in the metric itself but in the rate.  
  example: number of total requests

- **Gauges**:  
  A metric that can increment or decrement, and we are interested in the value at a specific time.  
  example: how much free memory

- **Histograms**:   
  We are interested in a numerical metric between two buckets.  
  example: latency of the system

**Instrumentation** is the action of defining the metric and expose it, 
and then it's up to prometheus to scrape the application and store it.

It is important when setting up prometheus in production to have 
an authentication layer, and then it's up to grafana to authenticate.

**Application metrics:** error rate ...  
**System metrics:** memory usage, cpu usage ...

## Running the demo

In this demo we are creating a metric called http_request_total that calculates the total number of http requests.
Then open grafana and import the dashboard in the grafana/dashboard folder.
```shell
  # Start the demo with
  docker-compose up -d
```