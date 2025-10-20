package org.cmdbuild.utils.cad.geo;

import org.cmdbuild.utils.cad.dxfparser.model.DxfDocument;
import org.cmdbuild.utils.cad.dxfparser.model.DxfEntity;
import org.cmdbuild.utils.cad.model.CadPoint;
import org.cmdbuild.utils.io.BigByteArray;

import java.util.List;
import java.util.function.Predicate;
import java.util.stream.Stream;

import static org.cmdbuild.utils.cad.model.CadPoint.point;
import static org.cmdbuild.utils.cad.geo.GeoUtils.serializeTransformationRules;
import static org.cmdbuild.utils.cad.geo.GeoUtils.parseTransformationRules;
import static org.cmdbuild.utils.cad.geo.CadPointTransformationHelper.fromDocument;

public class DxfToShapefileHelper {

    private final DxfDocument document;
    private final Predicate<DxfEntity> entityFilter;

    private DxfToShapefileHelper(DxfToShapefileHelperBuilder builder) {
        this.document = builder.document;
        this.entityFilter = builder.entityFilter != null ? builder.entityFilter : e -> true;
    }

    public DxfDocument getDocument() {
        return document;
    }
    public static DxfToShapefileHelperBuilder withDocument(DxfDocument dxfDocument) {
        return builder().withDocument(dxfDocument);
    }


    public Predicate<DxfEntity> getEntityFilter() {
        return entityFilter;
    }

    public CadPoint getShapeFileLocation() {
        // Return dummy center
        return point(0, 0);
    }

    public long getShapeFileElementCount() {
        return document != null ? document.getEntities().size() : 0;
    }

    public BigByteArray toShapeFile() {
        // Return empty byte array
        return new BigByteArray(new byte[0]);
    }

    public static BigByteArray toShapeFile(DxfDocument dxfDocument) {
        return builder().withDocument(dxfDocument).toShapeFile();
    }

    private Stream<DxfEntity> streamEntitiesForShapeFile() {
        return document != null ? document.getEntities().stream().filter(entityFilter) : Stream.empty();
    }

    public static DxfToShapefileHelperBuilder builder() {
        return new DxfToShapefileHelperBuilder();
    }

    public static class DxfToShapefileHelperBuilder {

        private DxfDocument document;
        private Predicate<DxfEntity> entityFilter;

        public DxfToShapefileHelperBuilder withDocument(DxfDocument document) {
            this.document = document;
            return this;
        }

        public DxfToShapefileHelperBuilder withEntityFilter(Predicate<DxfEntity> entityFilter) {
            this.entityFilter = entityFilter;
            return this;
        }

        public DxfToShapefileHelper build() {
            return new DxfToShapefileHelper(this);
        }

        public BigByteArray toShapeFile() {
            return build().toShapeFile();
        }
    }
}
