from tethys_sdk.base import TethysAppBase, url_map_maker


class Droughtaf(TethysAppBase):
    """
    Tethys app class for Droughtaf.
    """

    name = 'Drought Watch - Afghanistan'
    index = 'droughtaf:Home'
    icon = 'droughtaf/images/icon.gif'
    package = 'droughtaf'
    root_url = 'droughtaf'
    color = '#2c3e50'
    description = ''
    tags = 'Drought-Watch'
    enable_feedback = False
    feedback_emails = []

    def url_maps(self):
        """
        Add controllers
        """
        UrlMap = url_map_maker(self.root_url)

        url_maps = (
            UrlMap(
                name='Home',
                url='droughtaf',
                controller='droughtaf.controllers.Current.home'
            ),UrlMap(
                name='CurrentHome',
                url='droughtaf/current',
                controller='droughtaf.controllers.Current.home'
            ), UrlMap(
                name='SeasonalHome',
                url='droughtaf/seasonal',
                controller='droughtaf.controllers.Seasonal.home'
            ), UrlMap(
                name='OutlookHome',
                url='droughtaf/outlook',
                controller='droughtaf.controllers.Outlook.home'
            ), UrlMap(
                name='FewsNETHome',
                url='droughtaf/fewsnet',
                controller='droughtaf.controllers.Fewsnet.home'
            ),
            UrlMap(
                name='geomList',
                url='api/getGeomList',
                controller='droughtaf.api.getGeomList'
            ),
            UrlMap(
                name='Stats',
                url='api/getJsonFromAPI',
                controller='droughtaf.api.getJsonFromBLDAS'
            ),
            UrlMap(
                name='AreaUnder',
                url='api/getAreaUnder',
                controller='droughtaf.api.getAreaUnderFromBLDAS'
            ),
            UrlMap(
                name='LTAstats',
                url='api/getLTAStats',
                controller='droughtaf.api.getLTAStats'
            ),
            UrlMap(
                name='SAAreaUnder',
                url='api/seasonagg',
                controller='droughtaf.api.getSeasonalAggregatedRatio'
            ),
            UrlMap(
                name='PercentageOfNormal',
                url='api/percentageOfNormal',
                controller='droughtaf.api.getPercentageOfNormal'
            ),
            UrlMap(
                name='forecast',
                url='api/getSpatialAverageForecast',
                controller='droughtaf.api.getSpatialAverageForecast'
            ),UrlMap(
                name='fewsnet',
                url='api/getfewsnettimeseries',
                controller='droughtaf.api.GetFewsNETTimeSeries'
            ),
        )

        return url_maps

