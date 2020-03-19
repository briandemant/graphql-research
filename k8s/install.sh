#!/usr/bin/env bash
cd $(dirname $0)
kubectl delete configmap config-volume 2> /dev/null
kubectl create configmap config-volume --from-file=conf/
kubectl apply -f ./

# if config map changed prometheus needs to be recreated
kubectl delete pods --selector=name=prometheus
#kubectl delete pods --selector=name=jaeger
