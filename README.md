# Specs
Attributes are the resources that can be consumed by the end user on the client side. 

# Data
- Year 
- Set Number
- Name 
- Type: Toa, Turaga, Tohunga, Matoran, Rahi, 
- Color
- Relationships 
    - Kanohi
        data 

## Toa Types
- Mata
- Nuva
- Phantoka
- Inika
- Mahri

# URL Designs

### Get Toa Tahu
```
GET /api/v1/bionicles/toa?name=tahu
```

### Get Turaga Vakama
```
GET /api/v1/bionicles/turaga?name=vakama
```

### Get Matoran Jaller
```
GET /api/v1/bionicles/matoran?name=Jaller
```

### Get Rahi Nui-Rama
```
GET /api/v1/bionicles/rahi?name=Nui-Rama
```

### Get all Bionicles from the year 2001
```
GET /api/v1/bionicles?year=2001
```

### Get Toa by set ID of 8531 
```
GET /api/v1/bionicles/toa/8531
```


# NOTES!!

/toa?name=tahu should also return an array but filtered down to that one dude
/toa/name should return an object, not an array