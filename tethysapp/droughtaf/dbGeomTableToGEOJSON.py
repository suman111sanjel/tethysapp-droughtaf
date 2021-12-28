import os

DBUser = 'postgres'
DBPassword = '1cim0D@123'
DBhost = '192.168.11.242'
DBport = '5432'
DatabaseName = 'AFWatershed_watershed_afganistan'
# DatabaseName = 'raw_db'
DataBaseConnectionStrURL = "postgresql://" + DBUser + ":" + DBPassword + "@" + DBhost + ":" + DBport + "/" + DatabaseName


dbschema='gis,public' # Searches left-to-right


# sqlacodegen postgresql://postgres:1cim0D@123@192.168.11.242:5432/raw_db --schema public
# sqlacodegen postgresql://postgres:1cim0D@123@192.168.11.242:5432/AFWatershed_watershed_afganistan --schema gis


from sqlalchemy import CheckConstraint, Column, Integer, String, Table, Text, text,BigInteger,Numeric
from sqlalchemy.sql.sqltypes import NullType
from sqlalchemy.ext.declarative import declarative_base
from geoalchemy2.types import Geometry
from sqlalchemy.orm import sessionmaker
from sqlalchemy import create_engine
from sqlalchemy import func
import ast
import json
Base = declarative_base()
metadata = Base.metadata

db = create_engine(DataBaseConnectionStrURL,
    connect_args={'options': '-csearch_path={}'.format(dbschema)})

Base = declarative_base()

class HydrologicalMajorBasin(Base):
    __tablename__ = 'hydrological_major_basin'
    __table_args__ = {'schema': 'gis'}

    gid = Column(Integer, primary_key=True)
    objectid_1 = Column(BigInteger)
    objectid = Column(BigInteger)
    mj_basin_f = Column(String(40))
    count = Column(Numeric)
    first_rvrn = Column(String(50))
    last_rvrna = Column(String(50))
    first_basi = Column(String(40))
    last_basin = Column(String(40))
    count_basi = Column(String(40))
    first_majb = Column(String(25))
    last_majba = Column(String(25))
    count_majb = Column(String(25))
    area = Column(BigInteger)
    shape_leng = Column(Numeric)
    shape_le_1 = Column(Numeric)
    shape_area = Column(Numeric)
    geom = Column(Geometry, index=True)


class HydrologicalMacroLevelWatershed(Base):
    __tablename__ = 'hydrological_macro_level_watershed'
    __table_args__ = {'schema': 'gis'}

    gid = Column(Integer, primary_key=True)
    objectid_1 = Column(BigInteger)
    objectid = Column(BigInteger)
    mj_basin__ = Column(String(40))
    ws_name_f_ = Column(String(50))
    area = Column(Numeric)
    hectares = Column(Numeric)
    sq_km = Column(Numeric)
    perimeter = Column(Numeric)
    basin_name = Column(String(25))
    shape_leng = Column(Numeric)
    z_min = Column(Numeric)
    z_max = Column(Numeric)
    sarea = Column(Numeric)
    min_slope = Column(Numeric)
    max_slope = Column(Numeric)
    shape_le_1 = Column(Numeric)
    shape_area = Column(Numeric)
    geom = Column(Geometry, index=True)



GeojsonObject3857 = {
    'type': 'FeatureCollection',
    'crs': {
        'type': 'name',
        'properties': {'name': 'EPSG:4326'}
    },
    'features': [
    ]
}
Session = sessionmaker(db)
session = Session()
chitwanModel=session.query(HydrologicalMacroLevelWatershed).all()
# ab1='/home/suman/tethys3Apps/tethysapp-droughtchitwan/tethysapp/droughtchitwan/public/Shapes/Chitwan'
ab1='/home/suman/tethys3Apps/tethysapp-droughtaf/tethysapp/droughtaf/workspaces/app_workspace/Shapes/WatershedBasinAfghanistan'
# ab1='/home/suman/tethys3Apps/tethysapp-droughtchitwan/tethysapp/droughtchitwan/workspaces/app_workspace/Shapes/Chitwan'

for i in chitwanModel:
    featureObject = {
        'type': 'Feature',
        'geometry': {
            'type': 'Polygon',
            'coordinates': [-87.650175, 41.850385]
        },
        'properties': {
        }
    }

    geoJSONstr = session.query(func.ST_AsGeoJSON(i.geom))[0][0]
    geoJSON = ast.literal_eval(str(geoJSONstr))
    featureObject['geometry'] = geoJSON
    featureObject['properties']['ws_name_f_'] = i.ws_name_f_
    # featureObject['properties']['type_gn'] = i.type_gn
    # featureObject['properties']['province'] = i.province
    # featureObject['properties']['district'] = i.district
    GeojsonObject3857['features']=[featureObject]
    # print(GeojsonObject3857)
    fileName='l2'+i.ws_name_f_.replace(' ','_')+'.geojson'
    # print(fileName)
    fileFullpath=os.path.join(ab1,fileName)
    file2 = open(fileFullpath, "w+")
    strJson=json.dumps(GeojsonObject3857)
    file2.write(strJson)
    file2.close()

session.close()

