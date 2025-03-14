"""Initial migration

Revision ID: 82555cdf7e5b
Revises: 
Create Date: 2025-02-09 19:09:50.071326

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '82555cdf7e5b'
down_revision = None
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('plant',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('plant_naam', sa.String(length=50), nullable=False),
    sa.Column('plant_soort', sa.Enum('schimmel', 'kruiden', 'groente', 'fruit', 'overig'), nullable=False),
    sa.Column('plant_geteelt', sa.Boolean(), nullable=False),
    sa.Column('kas_locatie', sa.Enum('LEFT', 'RIGHT'), nullable=False),
    sa.PrimaryKeyConstraint('id'),
    sa.UniqueConstraint('plant_naam')
    )
    op.create_table('user',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('username', sa.String(length=20), nullable=False),
    sa.Column('email', sa.String(length=100), nullable=False),
    sa.Column('password', sa.String(length=255), nullable=False),
    sa.Column('role', sa.Enum('admin', 'bezoeker'), nullable=False),
    sa.Column('date_created', sa.DateTime(), nullable=True),
    sa.PrimaryKeyConstraint('id'),
    sa.UniqueConstraint('email'),
    sa.UniqueConstraint('username')
    )
    op.create_table('generic_plant_data',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('common_name', sa.String(length=255), nullable=True),
    sa.Column('scientific_name', sa.String(length=255), nullable=True),
    sa.Column('other_name', sa.String(length=255), nullable=True),
    sa.Column('cycle', sa.String(length=255), nullable=True),
    sa.Column('watering', sa.String(length=255), nullable=True),
    sa.Column('sunlight', sa.JSON(), nullable=True),
    sa.Column('plant_id', sa.Integer(), nullable=False),
    sa.ForeignKeyConstraint(['plant_id'], ['plant.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('oogst',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('datum', sa.DateTime(), nullable=True),
    sa.Column('succesvol', sa.Boolean(), nullable=True),
    sa.Column('plant_id', sa.Integer(), nullable=False),
    sa.ForeignKeyConstraint(['plant_id'], ['plant.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('specific_plant_data',
    sa.Column('specific_id', sa.Integer(), autoincrement=True, nullable=False),
    sa.Column('family', sa.String(length=255), nullable=True),
    sa.Column('origin', sa.JSON(), nullable=True),
    sa.Column('type', sa.String(length=255), nullable=True),
    sa.Column('dimension', sa.String(length=255), nullable=True),
    sa.Column('dimensions', sa.JSON(), nullable=True),
    sa.Column('cycle', sa.String(length=255), nullable=True),
    sa.Column('attracts', sa.JSON(), nullable=True),
    sa.Column('propagation', sa.JSON(), nullable=True),
    sa.Column('hardiness', sa.JSON(), nullable=True),
    sa.Column('watering', sa.String(length=255), nullable=True),
    sa.Column('depth_water_requirement', sa.JSON(), nullable=True),
    sa.Column('volume_water_requirement', sa.JSON(), nullable=True),
    sa.Column('watering_general_benchmark', sa.JSON(), nullable=True),
    sa.Column('plant_anatomy', sa.JSON(), nullable=True),
    sa.Column('sunlight', sa.JSON(), nullable=True),
    sa.Column('pruning_month', sa.JSON(), nullable=True),
    sa.Column('pruning_count', sa.JSON(), nullable=True),
    sa.Column('seeds', sa.Integer(), nullable=True),
    sa.Column('maintenance', sa.String(length=255), nullable=True),
    sa.Column('care_guides', sa.String(length=255), nullable=True),
    sa.Column('soil', sa.JSON(), nullable=True),
    sa.Column('growth_rate', sa.String(length=255), nullable=True),
    sa.Column('drought_tolerant', sa.Boolean(), nullable=True),
    sa.Column('salt_tolerant', sa.Boolean(), nullable=True),
    sa.Column('thorny', sa.Boolean(), nullable=True),
    sa.Column('invasive', sa.Boolean(), nullable=True),
    sa.Column('tropical', sa.Boolean(), nullable=True),
    sa.Column('indoor', sa.Boolean(), nullable=True),
    sa.Column('care_level', sa.String(length=255), nullable=True),
    sa.Column('pest_susceptibility', sa.JSON(), nullable=True),
    sa.Column('pest_susceptibility_api', sa.String(length=255), nullable=True),
    sa.Column('flowers', sa.Boolean(), nullable=True),
    sa.Column('flowering_season', sa.String(length=255), nullable=True),
    sa.Column('flower_color', sa.String(length=255), nullable=True),
    sa.Column('cones', sa.Boolean(), nullable=True),
    sa.Column('fruits', sa.Boolean(), nullable=True),
    sa.Column('edible_fruit', sa.Boolean(), nullable=True),
    sa.Column('edible_fruit_taste_profile', sa.String(length=255), nullable=True),
    sa.Column('fruit_nutritional_value', sa.String(length=255), nullable=True),
    sa.Column('fruit_color', sa.JSON(), nullable=True),
    sa.Column('harvest_season', sa.String(length=255), nullable=True),
    sa.Column('leaf', sa.Boolean(), nullable=True),
    sa.Column('leaf_color', sa.JSON(), nullable=True),
    sa.Column('edible_leaf', sa.Boolean(), nullable=True),
    sa.Column('cuisine', sa.Boolean(), nullable=True),
    sa.Column('medicinal', sa.Boolean(), nullable=True),
    sa.Column('poisonous_to_humans', sa.Boolean(), nullable=True),
    sa.Column('poisonous_to_pets', sa.Boolean(), nullable=True),
    sa.Column('description', sa.Text(), nullable=True),
    sa.Column('default_image', sa.JSON(), nullable=True),
    sa.Column('plant_id', sa.Integer(), nullable=False),
    sa.ForeignKeyConstraint(['plant_id'], ['plant.id'], ),
    sa.PrimaryKeyConstraint('specific_id')
    )
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_table('specific_plant_data')
    op.drop_table('oogst')
    op.drop_table('generic_plant_data')
    op.drop_table('user')
    op.drop_table('plant')
    # ### end Alembic commands ###
