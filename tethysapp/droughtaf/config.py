# from t
from tethysapp.droughtaf.app import Droughtaf
TethysAppName=Droughtaf.package
initilizationData={
    'country':'Afghanistan',
    'navLogoImage':'/static/'+TethysAppName+'/images/nologo.jpg',
    'defaultView':{
        'center': [7536273.55749104, 4035379.060030705],
        'zoom': 6
    },
    'TethysAppName':TethysAppName,
    'AdminLevel':'l2Ab_Band',
    # 'AdminLevel':'l2Middle_Hilmand',
}
initilizationDataFewsnet={
    'country':'Afghanistan',
    'navLogoImage':'/static/'+TethysAppName+'/images/nologo.jpg',
    'defaultView':{
        'center': [7536273.55749104, 4035379.060030705],
        'zoom': 6
    },
    'TethysAppName':TethysAppName,
    'AdminLevel':'l2Middle_Hilmand',
}

# let aa=app.map.getView().calculateExtent()
# let center=[(aa[0]+aa[2])/2,(aa[1]+aa[3])/2]

