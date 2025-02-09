from marshmallow import Schema, fields

class Perenueal(Schema):
    id = fields.Int()
    name = fields.Str()
    price = fields.Float()
