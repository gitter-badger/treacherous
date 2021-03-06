import {PropertyResolver} from "property-resolver";
import {EventHandler} from "event-js";
import {TypeHelper} from "../helpers/type-helper";

import {Ruleset} from "../rulesets/ruleset";
import {PropertyWatcher} from "./property-watcher";
import {PropertyChangedEvent} from "../events/property-changed-event";
import {IModelWatcher} from "./imodel-watcher";

export class ModelWatcher implements IModelWatcher
{
    private watchCache: Array<PropertyWatcher> = [];
    private watchCacheKeys: Array<string> = [];
    private watcherInterval: any = null;
    private model: any;
    private ruleset: Ruleset;

    public scanInterval: any;
    public onPropertyChanged: EventHandler;

    constructor(private propertyResolver = new PropertyResolver()) {
        this.onPropertyChanged = new EventHandler(this);
    }

    public setupWatcher = (model: any, ruleset: Ruleset, scanInterval = 500) => {
        this.model = model;
        this.ruleset = ruleset;
        this.scanInterval = scanInterval;
        this.watchCache = [];
        this.watchCacheKeys = [];
        this.cacheWatchTargets("", this.ruleset);
        this.scanProperties();
        this.startWatching();
    }

    public startWatching = () => {
        this.stopWatching();
        this.watcherInterval = setInterval(this.scanProperties, this.scanInterval);
    };

    public stopWatching = () => {
      if(this.watcherInterval) { clearInterval(this.watcherInterval); }
    };

    private updateAndNotifyDifferences = () => {
        var previousKeyCache = this.watchCacheKeys;

        this.watchCache = [];
        this.watchCacheKeys = [];
        this.cacheWatchTargets("", this.ruleset);

        this.watchCacheKeys.forEach((key, index) => {
            if(previousKeyCache.indexOf(key) == -1) {
                var previousValue = this.watchCache[index].previousValue;
                var propertyChangedArgs = new PropertyChangedEvent(key, previousValue, null);
                setTimeout(() => { this.onPropertyChanged.publish(propertyChangedArgs); }, 1);
            }
        })
    }

    private watchProperty = (watchRoute, previousData) => {

        if(this.watchCacheKeys.indexOf(watchRoute) == -1)
        {
            var propertyWatcher = new PropertyWatcher(watchRoute, previousData);
            this.watchCache.push(propertyWatcher);
            this.watchCacheKeys.push(watchRoute);
        }
    }

    private cacheWatchTargets = (propertyStack, ruleset) => {
        var paramRoute, parameterRules;
        for(var param in ruleset.rules)
        {
            paramRoute = propertyStack ? propertyStack + "." + param : param;
            parameterRules = ruleset.rules[param];

            parameterRules.forEach((rule) => {
                var currentValue = this.propertyResolver.resolveProperty(this.model, paramRoute);
                var isArray = TypeHelper.isArrayType(currentValue);
                if(isArray)
                {
                    var cachedArrayInfo = { length: currentValue.length, isArray: true };
                    this.watchProperty(paramRoute, cachedArrayInfo);
                }

                if(rule.isForEach)
                {
                    // ruleset
                    if(rule.internalRule.getRulesForProperty)
                    {
                        this.model[param].forEach((element, index) => {
                            this.cacheWatchTargets(paramRoute + "[" + index + "]", rule.internalRule);
                        });
                    }
                    else
                    {
                        this.model[param].forEach((element, index) => {
                            this.watchProperty(paramRoute + "[" + index  +"]", this.model[param][index]);
                        });
                    }
                }
                else
                {
                    // ruleset
                    if(rule.getRulesForProperty)
                    {
                        this.cacheWatchTargets(paramRoute, rule);
                    }
                    else
                    {
                        if(!isArray)
                        { this.watchProperty(paramRoute, currentValue); }
                    }
                }
            });
        }
    };

    private scanProperties = () => {
        if(this.onPropertyChanged.getSubscriptionCount() == 0) { return; }
        if(this.watchCache.length == 0) { return; }

        var refreshOnNextCycle = false;
        this.watchCache.forEach((propertyWatcher: PropertyWatcher) => {
            var currentValue = this.propertyResolver.resolveProperty(this.model, propertyWatcher.propertyPath);

            if(currentValue && propertyWatcher.previousValue.isArray)
            {
                if(currentValue.length != propertyWatcher.previousValue.length)
                { refreshOnNextCycle = true; }
            }
            else if (currentValue !== propertyWatcher.previousValue) {
                var propertyChangedArgs = new PropertyChangedEvent(propertyWatcher.propertyPath, currentValue, propertyWatcher.previousValue);
                setTimeout(() => { this.onPropertyChanged.publish(propertyChangedArgs); }, 1);
                propertyWatcher.previousValue = currentValue;
            }
        });

        if(refreshOnNextCycle)
        { setTimeout(this.updateAndNotifyDifferences, 1); }
    };
}